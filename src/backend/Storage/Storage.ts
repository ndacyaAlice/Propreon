import { StableBTreeMap, text , nat64, Principal} from "azle/experimental"
import  { Property,Booking } from "../types/dataTypes"

const PropertyStorage = StableBTreeMap<text, Property>(0)
const PendingBookingStorage = StableBTreeMap<nat64,Booking>(1)
const persistedBookingStorage = StableBTreeMap<Principal,Booking>(2)

export {
    PropertyStorage,
    PendingBookingStorage,
    persistedBookingStorage 
}