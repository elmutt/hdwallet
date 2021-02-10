import { HDWallet, HDWalletInfo } from "@elmutt/hdwallet-core";

import { ethereumTests } from "./ethereum";

export function ethTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  ethereumTests(get);
}
