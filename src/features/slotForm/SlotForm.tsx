import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../../common/components/fields/InputField";
import { UpdateSlotValues, Slot } from "../../app/types";
import { ParentValues, ParentsField } from "./fields/ParentsField";
import Spin from "../../common/components/Spin";
import { TextareaField } from "../../common/components/fields/TextareaField";
import { FieldGroup, Fieldset } from "../../common/components/fieldset";
import { Button } from "../../common/components/button";

type FormInput = {
  summary: string;
  content: string;
  parents: ParentValues[];
};

type Props = {
  action: string;
  slot?: Slot;
  parents?: Slot[];
  slots: Slot[];
  disabled?: boolean;
  isAction?: boolean;
  onAction: (values: UpdateSlotValues) => void;
  onCancel: () => void;
};

export function SlotForm({
  slot,
  parents,
  disabled,
  isAction,
  slots,
  action,
  onAction,
  onCancel,
}: Props) {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      summary: slot?.summary || "",
      content: slot?.content || "",
      parents:
        parents?.map((x) => ({
          slotId: x.id,
          summary: x.summary,
        })) || [],
    },
  });
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const values: UpdateSlotValues = {
      summary: data.summary,
      content: data.content,
      parents: data.parents?.map((x) => x.slotId),
    };
    onAction(values);
  };

  const restSlots = slot?.id ? slots.filter((x) => x.id !== slot.id) : slots;

  return (
    <form
      className="flex flex-col gap-3 p-2 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Fieldset>
        <FieldGroup>
          <InputField
            label="Summary *"
            control={control}
            name="summary"
            rules={{ required: true }}
          />
          <TextareaField label="Content" control={control} name="content" />
          <ParentsField
            className={restSlots.length === 0 ? "hidden" : ""}
            control={control}
            name="parents"
            slots={restSlots}
          />
        </FieldGroup>
      </Fieldset>

      <div className="flex justify-end mt-12 gap-2">
        <Button plain disabled={disabled} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={disabled} type="submit">
          {isAction && <Spin className="-ml-1 mr-2" />}
          {action}
        </Button>
      </div>
    </form>
  );
}
