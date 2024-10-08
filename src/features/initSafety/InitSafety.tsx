import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../../common/components/fields/InputField";
import { getHash, getSalt } from "../../common/utils";
import { Transaction } from "@mysten/sui/transactions";
import { useSafety, useSignAndExecute } from "../../app/hooks";
import { Button } from "../../common/components/button";
import Spin from "../../common/components/Spin";
import * as safekeeper from "../../app/safekeeper";
import { Heading, Subheading } from "../../common/components/heading";
import { Divider } from "../../common/components/divider";
import { Text } from "../../common/components/text";

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
