import { InputProps } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Input } from "../input";
import { Field, Label } from "../fieldset";

export function InputField<TFieldValues extends FieldValues = FieldValues>(
  props: UseControllerProps<TFieldValues> & {
    className?: string;
    label?: string;
    type?: InputProps["type"];
  }
) {
  const { field } = useController(props);
  return (
    <Field className={props.className}>
      {props.label && (
        <Label>
          {props.label}
        </Label>
      )}
      <Input {...field} type={props.type || "text"} />
    </Field>
  );
}
