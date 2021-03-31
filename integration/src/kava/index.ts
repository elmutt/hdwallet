import { HDWallet, HDWalletInfo } from "@elmutt/hdwallet-core";

import { kavaTests as tests } from "./kava";

export function kavaTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  tests(get);
}
