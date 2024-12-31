import {Err, Ok ,ic, text} from "azle/experimental";
import { v4 as uuidv4 } from "uuid";
import { Property, PropertyProps } from "../types/dataTypes";
import getDate from "../utils/Date";
import { PropertyStorage } from "../Storage/Storage";



class PropertyController {
    static CreateProperty=(payload:PropertyProps)=>{
     
        try{
           const {  
            Title,
            Bedroom,
            Bathroom,
            Parking,
            Description,
            Location,
            PricePerVisit
        } = payload;
            if(!Title || !Bedroom || !Bathroom ||  !Description || !Location || !PricePerVisit ) {
                return Err({InvalidPayload: "Invalid input"})
            }

            const NewProperty = {
                id: uuidv4(),
                Owner: ic.caller(),
                Title,
                Bedroom,
                Bathroom,
                Parking,
                Description,
                Location,
                PricePerVisit, 
                Image: "https://images.adsttc.com/media/images/6040/f49e/f91c/811a/2800/00df/slideshow/_11.0.jpg?1614869643",
                CreatedAt: getDate(),
                UpdatedAt: getDate() 
            }
            PropertyStorage.insert(NewProperty.id,NewProperty)
            return Ok("Created successfully")
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})
        }
    }
    static  GetAllProperty=()=>{
        try{
            const AllProperties = PropertyStorage.values()
            return Ok(AllProperties)
        }catch(error: any) {
            return Err({Error: `Error occured ${error.message}`})   
        }
    }
   
    static getMyProperty=()=>{
        const AllProperties = PropertyStorage.values()
        if(AllProperties.length == 0) {
            return Err({NotFound: "Empty"})
        }

        const MyProperties = AllProperties.filter((property: Property)=>(
            JSON.stringify(property.Owner) == JSON.stringify(ic.caller())
        )) 
        if(MyProperties.length == 0) {
            return Err({NotFound: "Empty"})
        }

        return Ok(MyProperties)
    }
    static GetOneProperty=(PropertyId: text)=>{
        try{
           const PropertyOpt = PropertyStorage.get(PropertyId)
           if(!PropertyOpt){
            return Err({NotFound:"Property not found"})
           }
           return Ok(PropertyOpt)
        }catch(error:any) {
            return Err({Error: `Error occured ${error.message}`})   
        }
    }
}

export default PropertyController