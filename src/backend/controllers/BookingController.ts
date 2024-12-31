import { Ok,ic, Principal,Err , Some, text} from "azle/experimental";
import { hexAddressFromPrincipal } from "azle/canisters/ledger";
import { v4 as uuidv4 } from "uuid";
import { Booking, BookingProps, ConfirmProps } from "../types/dataTypes";
import {  PendingBookingStorage, persistedBookingStorage, PropertyStorage } from "../Storage/Storage";
import getDate from "../utils/Date";
import { discardByTimeout, generateId } from "../utils/GenerateId";
import { verifyPaymentInternal } from "../utils/Verify";


const TIMEOUT_PERIOD = 9600n;

class BookingController {

    static Book =(Payload:BookingProps)=>{
        try{
         const {   
            PropertyId,
            VisitorName,
            VisitorEmail,
            VisitDate } = Payload;

            if( 
                !PropertyId ||
                !VisitorName ||
                !VisitorEmail ||
                !VisitDate 
            ){
                return Err({InvalidPayload:"Input error"})
            }

            const PropertyOpt = PropertyStorage.get(PropertyId)
            if(!PropertyOpt) {
                return Err({NotFound:"Property not found"})
            }

            const NewBooking: Booking = {
                id: uuidv4(),
                PropertyId,
                Owner: PropertyOpt.Owner,
                Visitor: ic.caller(),
                VisitorName,
                VisitorEmail,
                VisitDate,
                Status:  {PENDING:"PENDING"},
                Amount: PropertyOpt.PricePerVisit,    
                PaymentStatus:  {UNPAID:"UNPAID"},
                CreatedAt: getDate(),
                paid_at_block: {None:null},
                memo: generateId(PropertyId),
            }

            PendingBookingStorage.insert(NewBooking.memo,NewBooking)
            discardByTimeout(NewBooking.memo, TIMEOUT_PERIOD)
            console.log(PendingBookingStorage.values())
            return Ok(NewBooking)

         
        }catch(error: any) {
            return Err({Error:`Error occured ${error.message}`})
        }
    }
    static BookByProperty=(ProductId: text)=>{

      try{
        const AllBooks = PendingBookingStorage.values();
        if(AllBooks.length == 0){
           return Err({NotFound: "Empty Booking"})
        }
        const BookingsByProduct = AllBooks.filter((booking: Booking)=>(
            (booking.PropertyId == ProductId) && (JSON.stringify(booking.Owner)==JSON.stringify(ic.caller()))
        ));
        if(BookingsByProduct.length == 0){
            return Err({NotFound:"Empty Booking"})
        }
        return Ok(BookingsByProduct)
      }catch(error: any){
        return Err({Error: `Error occured ${error.message}`})
      }

    }
    
    static MyBookings=()=>{
        try{
            const AllBooks= PendingBookingStorage.values();
            if(AllBooks.length == 0){
               return Err({NotFound: "Empty Booking"})
            }
            const MyBookings = AllBooks.filter((booking: Booking)=>(
                (JSON.stringify(booking.Visitor)==JSON.stringify(ic.caller()))
            ));
            if(MyBookings.length == 0){
                return Err({NotFound:"Empty Booking"})
            }
            return Ok(MyBookings)
          }catch(error: any){
            return Err({Error: `Error occured ${error.message}`})
          }
    }
    static confirmBook=async(payload:ConfirmProps)=>{
        try{
            const {  
                Receivor,
                Amount,
                block,
                memo
                } = payload
         const paymentVerified = await verifyPaymentInternal(
            Receivor,
            Amount,
            block,
            memo
          );
          if (!paymentVerified) {
            return Err({
              NotFound: `Cannot verify the payment, memo=${memo}`,
            });
          }

          const pendingBookingOpt = PendingBookingStorage.remove(memo);
          if(!pendingBookingOpt) {
            return Err({NotFound: "Not such booking exist"})
          }
          const UpdateBooking = {
            ...pendingBookingOpt,
            Status:  {CONFIRMED:"CONFIRMED"},    
            PaymentStatus:  {PAID:"PAID"},
            paid_at_block: Some(block)
          }
          persistedBookingStorage.insert(ic.caller(),UpdateBooking)
          return Ok(UpdateBooking)
        }catch(error:any) {
          console.log(error)
            return Err({Error:`Error occured ${error.message}`})
        }
    }

    static VerifyPayment=async(payload: ConfirmProps)=>{
            const { Receivor,Amount,block,memo } = payload;
            return await verifyPaymentInternal(Receivor,Amount,block,memo)
    }

    static getAddressFromPrincipal=(principal:Principal)=>{
        return hexAddressFromPrincipal(principal, 0)
    }
}

export default BookingController
