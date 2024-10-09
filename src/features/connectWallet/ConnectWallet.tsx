import { ConnectButton } from "@mysten/dapp-kit";
import { Text } from "../../common/components/text";
import { Heading } from "../../common/components/heading";
import { Divider } from "../../common/components/divider";

export function ConnectWallet() {
  return (
    <>
      <div className="mx-auto max-w-3xl">
        <Heading>Welcome to <span className="font-light tracking-wide text-yellow-600 dark:text-yellow-400">Keystore</span></Heading>
        <Divider className="my-10 mt-6" soft />

        {/* <section className="grid sm:grid-cols-1">
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            assumenda, maxime distinctio quam laborum aperiam ipsa corrupti
            numquam commodi voluptates nesciunt quasi tempora consectetur,
            aspernatur dolor facere rerum sequi. Saepe.
          </Text>
        </section>

        <Divider className="my-10 mt-6" /> */}

        <div className="flex gap-4 items-center flex-wrap">
          <ConnectButton className="!bg-slate-800 dark:!bg-slate-600 !text-white !py-2.5 !px-10" />
          <Text>Please connect to wallet.</Text>
        </div>
      </div>
    </>
  );
}
