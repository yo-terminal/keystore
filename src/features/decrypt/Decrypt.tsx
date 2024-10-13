import { SubmitHandler, useForm } from "react-hook-form";
import {
  InputField,
  Heading,
  Divider,
  Text,
  Button,
} from "@trade-project/ui-toolkit";
import * as safekeeper from "../../app/safekeeper";
import { useSafety } from "../../app/hooks";

type FormInput = {
  password: string;
};

export function Decrypt() {
  const { control, handleSubmit, setValue } = useForm<FormInput>();
  const { safety } = useSafety();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const password = data.password;
    const ok = await safekeeper.setPassword(password, safety!);
    if (!ok) {
      alert("Wrong password");
      setValue("password", "");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl">
      <Heading>
        <span className="font-light tracking-wide text-yellow-600 dark:text-yellow-500">
          Keystore
        </span>{" "}
        is locked
      </Heading>
      <Divider className="my-10 mt-6" soft />

      <section className="mt-10 grid gap-x-2 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          {/* <Subheading>Password</Subheading> */}
          <InputField
            className="sm:col-span-3"
            // label="Set Password"
            control={control}
            name="password"
            type="password"
            rules={{ required: true }}
          />
          <Text>Please enter password to unlock your keystore.</Text>
        </div>
        <div>
          {/* <InputField
            className="sm:col-span-3"
            // label="Set Password"
            control={control}
            name="password"
            type="password"
            rules={{ required: true }}
          /> */}
          <Button type="submit">Unlock</Button>
        </div>
      </section>

      {/* <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="submit">
          Unlock
        </Button>
      </div> */}
    </form>
  );
}
