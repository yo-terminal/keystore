import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Switch, SwitchField } from "../switch";
import { Label } from "../fieldset";

export function ToggleField<TFieldValues extends FieldValues = FieldValues>(
  props: UseControllerProps<TFieldValues> & {
    className?: string;
    label?: string;
  }
) {
  const { field } = useController(props);

  return (
    <SwitchField className={props.className}>
      <Switch checked={field.value} onChange={field.onChange} />
      {props.label && <Label>{props.label}</Label>}
    </SwitchField>
  );
}
