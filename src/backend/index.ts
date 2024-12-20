import {
    query,
    update,
    text,
    Vec,
    Result,
    Canister,
  } from "azle/experimental";
  import PropertyController from "./controllers/PropertyController";
  import { PropertyProps,Message , Property} from "./types/dataTypes";


  export default Canister({
    CreateProperty: update([PropertyProps],Result(text, Message),(payload)=>{
      return PropertyController.CreateProperty(payload)
    }),
    GetAllProperty: query([], Result(Vec(Property), Message),()=>{
      return PropertyController.GetAllProperty()
    }),
    GetOneProperty:query([text],Result(Property,Message),(PropertyId)=>{
      return PropertyController.GetOneProperty(PropertyId)
    })
  })