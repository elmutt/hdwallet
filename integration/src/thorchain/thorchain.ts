import * as core from "@elmutt/hdwallet-core";

import tx_unsigned from "./tx01.testnet.thorchain.json";
import tx_signed from "./tx01.testnet.thorchain.signed.json";


const MNEMONIC12_NOPIN_NOPASSPHRASE = "alcohol woman abuse must during monitor noble actual mixed trade anger aisle";

const TIMEOUT = 60 * 1000;

/**
 *  Main integration suite for testing ThorchainWallet implementations' Thorchain support.
 */
export function thorchainTests(get: () => { wallet: core.HDWallet; info: core.HDWalletInfo }): void {
  let wallet: core.ThorchainWallet & core.HDWallet;

  describe("Thorchain", () => {
    beforeAll(async () => {
      const { wallet: w } = get();
      if (core.supportsThorchain(w)) wallet = w;
    });

    beforeEach(async () => {
      if (!wallet) return;
      await wallet.wipe();
      await wallet.loadDevice({
        mnemonic: MNEMONIC12_NOPIN_NOPASSPHRASE,
        label: "test",
        skipChecksum: true,
      });
    }, TIMEOUT);

    test(
      "thorchainGetAccountPaths()",
      () => {
        if (!wallet) return;
        const paths = wallet.thorchainGetAccountPaths({ accountIdx: 0 });
        expect(paths.length > 0).toBe(true);
        expect(paths[0].addressNList[0] > 0x80000000).toBe(true);
      },
      TIMEOUT
    );

    test(
      "describePath() thorchain",
      async () => {
        if (!wallet) return;
        expect(
          wallet.describePath({
            path: core.bip32ToAddressNList("m/44'/931'/0'/0/0"),
            coin: "Thorchain"
          }),
        );
      },
      TIMEOUT
    );

    test(
      "thorchainGetAddress()",
      async () => {
        if (!wallet) return;
        expect(
          await wallet.thorchainGetAddress({
            addressNList: core.bip32ToAddressNList("m/44'/931'/0'/0/0"),
            showDisplay: false,
            testnet: true
          })
        ).toEqual("tthor1ls33ayg26kmltw7jjy55p32ghjna09zp6z69y8");
      },
      TIMEOUT
    );

    test(
      "thorchainSignTx()",
      async () => {
        if (!wallet) return;
        const input: core.ThorchainSignTx = {
          tx: tx_unsigned as any,
          addressNList: core.bip32ToAddressNList("m/44'/931'/0'/0/0"),
          chain_id: "thorchain",
          account_number: "16354",
          sequence: "5",
        };

        const res = await wallet.thorchainSignTx(input);
        switch(wallet.getVendor()){
          case "KeepKey":
            expect(res.signatures[0].signature).toEqual(tx_signed.tx.signatures[0].signature_keepkey);
            break;
          default:
            expect(res.signatures[0].signature).toEqual(tx_signed.tx.signatures[0].signature);
            break;

        }
      },
      TIMEOUT
    );
  });
}
