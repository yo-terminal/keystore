import { SlotForm } from "../../slotForm/SlotForm";
import { closeUpdateSlotDialog } from "./updateSlotDialogSlice";
import { useAppDispatch, useBook, useSignAndExecute } from "../../../app/hooks";
import { Transaction } from "@mysten/sui/transactions";
import { UpdateSlotValues } from "../../../app/types";
import * as safekeeper from "../../../app/safekeeper";
import { encrypt } from "../../../common/utils";

type Props = {
  slotId: string;
};

export function UpdateSlotForm({ slotId }: Props) {
  const dispatch = useAppDispatch();
  const { slots, slotMap, parents, refetch } = useBook();

  const { packageId, signAndExecute, isPending } = useSignAndExecute();

  const closeDialog = () => {
    dispatch(closeUpdateSlotDialog());
  };

  const updateSlot = async (values: UpdateSlotValues) => {
    const tx = new Transaction();

    const key = safekeeper.getKey()!;
    const summary = await encrypt(values.summary, key);
    const content = values.content ? await encrypt(values.content, key) : null;

    tx.moveCall({
      arguments: [
        tx.object(slotId),
        tx.pure.string(summary),
        tx.pure.option("bool", null),
        tx.pure.option("bool", null),
        tx.pure.option("string", content),
        tx.pure.option("u64", null),
        tx.pure.option("vector<address>", values.parents || null),
      ],
      target: `${packageId}::book::update_slot`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          closeDialog();
          setTimeout(() => {
            refetch();
          }, 500);
          setTimeout(() => {
            refetch();
          }, 1500);
        },
        onError: () => {
          alert("Something went wrong");
        },
      }
    );
  };

  return (
    <SlotForm
      action="Update Slot"
      disabled={isPending}
      isAction={isPending}
      parents={parents[slotId] || []}
      slot={slotMap[slotId]}
      slots={slots}
      onAction={updateSlot}
      onCancel={closeDialog}
    />
  );
}
