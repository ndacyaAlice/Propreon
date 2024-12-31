import { 
    text,
    ic,
    nat64
} from "azle/experimental";
import { hashCode } from "hashcode"
import { PendingBookingStorage } from "../Storage/Storage";


export const hash=(input: any): nat64=>{
    return BigInt(Math.abs(hashCode().value(input)))
}

export const generateId=(bookId:text)=>{
    const correlationId = `${bookId}_${ic.caller().toText()}_${ic.time()}`;
    return hash(correlationId);
}

export const discardByTimeout=(memo: nat64, delay: nat64) =>{
    ic.setTimer(delay, () => {
      const order = PendingBookingStorage.remove(memo);
      console.log(`Reserve discarded ${order}`);
    });
  }
  