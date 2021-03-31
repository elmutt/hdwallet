import { HDWallet, HDWalletInfo } from "@elmutt/hdwallet-core";

import { bitcoinTests } from "./bitcoin";
import { testnetTests } from "./testnet";
import { litecoinTests } from "./litecoin";

export function btcTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  bitcoinTests(get);
  testnetTests(get);
  litecoinTests(get);
}
