import { SubmitHandler, useForm } from "react-hook-form";
import { InputField, Button, Spin, Heading, Subheading, Divider, Text } from "@trade-project/ui-toolkit";
import { getHash, getSalt } from "../../common/utils";
import { Transaction } from "@mysten/sui/transactions";
import { useSafety, useSignAndExecute } from "../../app/hooks";
import * as safekeeper from "../../app/safekeeper";
import Warning from "./Warning";

type FormInput = {
  password: string;
};

export function InitSafety() {
  const { refetch } = useSafety();
  const { packageId, signAndExecute, isPending } = useSignAndExecute();

  function create(
    salt: string,
    verifyHash: string,
    verifySalt: string,
    password: string
  ) {
    const tx = new Transaction();

    tx.moveCall({
      arguments: [
        tx.pure.string(salt),
        tx.pure.string(verifyHash),
        tx.pure.string(verifySalt),
      ],
      target: `${packageId}::book::create_safety`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          safekeeper
            .setPassword(password, {
              salt,
              verify: { hash: verifyHash, salt: verifySalt },
            })
            .then(() => {
              setTimeout(() => {
                refetch();
              }, 500);
              setTimeout(() => {
                refetch();
              }, 1500);
            });
        },
      }
    );
  }
  const { control, handleSubmit, setValue } = useForm<FormInput>({
    defaultValues: { password: "" },
  });
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const password = data.password;
    const salt = getSalt();
    const verify = await getHash(password);
    create(salt, verify.hash, verify.salt, password);
    setValue("password", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl">
      <Heading>Security settings</Heading>
      <Divider className="my-10 mt-6" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Set Password</Subheading>
          <Text>Please set password to encrypt your keystore.</Text>
        </div>
        <div>
          <InputField
            className="sm:col-span-3"
            // label="Set Password"
            control={control}
            name="password"
            // type="password"
            rules={{ required: true }}
          />
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-6">
        <Warning
          messages={[
            "To ensure the security of your sensitive information, you must create a strong password with at least 10 characters, including special characters. Weak passwords are vulnerable to brute force attacks, making it easier for attackers to gain access to your data. Please choose a complex and unique password to protect your information.",
            "Our application does not store or track any information about your password. If you forget your password, we will not be able to restore it or provide access to your stored data. Please ensure you choose a secure password and keep it in a safe place, as it is solely your responsibility to remember it.",
          ]}
        />
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Spin className="-ml-1 mr-2" />}
          Set Password
        </Button>
      </div>
    </form>
  );
}
