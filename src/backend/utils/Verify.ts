import { bool, ic, nat64, Principal } from "azle/experimental";
import { binaryAddressFromPrincipal ,Ledger} from "azle/canisters/ledger";
import { hash } from "./GenerateId";


export const verifyPaymentInternal=async(
    receiver: Principal,
    amount: nat64,
    block: nat64,
    memo: nat64
  ): Promise<bool>=> {
    const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));
    const blockData = await ic.call(icpCanister.query_blocks, {
      args: [{ start: block, length: 1n }],
    });
    const tx = blockData.blocks.find((block: any) => {
      if (!block.transaction.operation) {
        return false;
      }
      const operation = block.transaction.operation.Some;
      const senderAddress = binaryAddressFromPrincipal(ic.caller(), 0);
      const receiverAddress = binaryAddressFromPrincipal(receiver, 0);
      return (
        block.transaction.memo === memo &&
        hash(senderAddress) === hash(operation.Transfer?.from) &&
        hash(receiverAddress) === hash(operation.Transfer?.to) &&
        amount === operation.Transfer?.amount.e8s
      );
    });
    return tx ? true : false;
  }