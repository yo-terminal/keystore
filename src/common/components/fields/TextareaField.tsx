import { TextareaProps } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Textarea } from "../textarea";
import { Field, Label } from "../fieldset";

export function TextareaField<TFieldValues extends FieldValues = FieldValues>(
  props: UseControllerProps<TFieldValues> & {
    className?: string;
    label?: string;
    rows?: TextareaProps["rows"];
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
      <Textarea {...field} rows={props.rows || 3} />
    </Field>
  );
}
