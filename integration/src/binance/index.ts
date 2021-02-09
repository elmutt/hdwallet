import { HDWallet, HDWalletInfo } from "@elmutt/hdwallet-core";

import { binanceTests as tests } from "./binance";

export function binanceTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  tests(get);
}
