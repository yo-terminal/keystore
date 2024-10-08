import { Label } from "@headlessui/react";
import { Switch, SwitchField } from "./switch";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function Toggle({ checked, onChange, label }: Props) {
  return (
    <SwitchField>
      <Label>
        {label}
      </Label>
      <Switch checked={checked} onChange={onChange} />
    </SwitchField>
  );
}
