import { HDWallet, HDWalletInfo } from "@elmutt/hdwallet-core";

import { thorchainTests as tests } from "./thorchain";

export function thorchainTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  tests(get);
}
