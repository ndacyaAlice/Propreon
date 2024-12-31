import {
    query,
    update,
    text,
    Vec,
    Result,
    Canister,
    bool,
    Principal,
  } from "azle/experimental";
  import PropertyController from "./controllers/PropertyController";
  import { PropertyProps,Message , Property, BookingProps, Booking, ConfirmProps} from "./types/dataTypes";
import BookingController from "./controllers/BookingController";
  


  export default Canister({
    CreateProperty: update([PropertyProps],Result(text, Message),(payload)=>{
      console.log(payload)
      return PropertyController.CreateProperty(payload)
    }),
    GetAllProperty: query([], Result(Vec(Property), Message),()=>{
      return PropertyController.GetAllProperty()
    }),
    GetOneProperty:query([text],Result(Property,Message),(PropertyId)=>{
      return PropertyController.GetOneProperty(PropertyId)
    }),
    getMyProperty: query([], Result(Vec(Property),Message), ()=>{
       return PropertyController.getMyProperty()
    }),
    Book:update([BookingProps],Result(Booking,Message),(payload)=>{
       return  BookingController.Book(payload)
     }),
     BookByProperty: query([text], Result(Vec(Booking),Message),(id)=>{
      return BookingController.BookByProperty(id)
    }),
    MyBooking: query([], Result(Vec(Booking), Message), ()=>{
      return BookingController.MyBookings()
    }),
    confirmBook: update([ConfirmProps],Result(Booking, Message),(payload)=>{
       return BookingController.confirmBook(payload)
    }),
    verifyPayment: query([ConfirmProps],bool,async (payload) => {
        return await BookingController.VerifyPayment(payload);
      }
    ),
    getAddressFromPrincipal: query([Principal], text, (principal) => {
      return BookingController.getAddressFromPrincipal(principal)
    })
  })