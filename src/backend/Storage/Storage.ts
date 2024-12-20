import { StableBTreeMap, text } from "azle/experimental"
import  { Property } from "../types/dataTypes"

const PropertyStorage = StableBTreeMap<text, Property>(0)

export {
    PropertyStorage
}