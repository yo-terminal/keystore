import { ConnectButton } from "@mysten/dapp-kit";
import { Text } from "../../common/components/text";
import { Heading } from "../../common/components/heading";
import { Divider } from "../../common/components/divider";

export function ConnectWallet() {
  return (
    <>
      <div className="mx-auto max-w-3xl">
        <Heading>
          Welcome to{" "}
          <span className="font-light tracking-wide text-yellow-600 dark:text-yellow-500">
            Keystore
          </span>
        </Heading>
        <Divider className="my-10 mt-6" soft />

        <section className="grid sm:grid-cols-1">
          <Text>
            Keystore is a secure and decentralized storage solution built on the
            SUI blockchain, designed to protect your most sensitive information.
            Whether it’s private keys, passwords, or credit card details,
            Keystore ensures that your data remains encrypted and accessible
            only to you, providing the ultimate peace of mind in safeguarding
            your digital assets.
          </Text>
        </section>

        <Divider className="my-10" />

        <div className="flex gap-4 items-center flex-wrap">
          <ConnectButton className="!bg-slate-800 dark:!bg-slate-600 !text-white !py-2.5 !px-10" />
          <Text>Please connect to wallet.</Text>
        </div>
      </div>
    </>
  );
}
