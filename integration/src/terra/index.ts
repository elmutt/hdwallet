import { HDWallet, HDWalletInfo } from "@elmutt/hdwallet-core";

import { terraTests as tests } from "./terra";

export function terraTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  tests(get);
}
