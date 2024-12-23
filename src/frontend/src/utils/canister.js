import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/backend/backend.did.js"

//change this Canister 
const PROPREON_CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

export const PropeonCanister=async()=>{
 return await getCanister(PROPREON_CANISTER_ID,idlFactory);
}

const getCanister=async(canisterId,idl)=>{
  const authClient = window.auth.client;
  const agent = new HttpAgent({
    identity: authClient.getIdentity(),
  });
  await agent.fetchRootKey();
  return Actor.createActor(idl,{
    agent,
    canisterId
  });
}
