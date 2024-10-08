import { SlotForm } from "../../slotForm/SlotForm";
import { closeCreateSlotDialog } from "./createSlotDialogSlice";
import { useAppDispatch, useBook, useSignAndExecute } from "../../../app/hooks";
import { Transaction } from "@mysten/sui/transactions";
import { UpdateSlotValues } from "../../../app/types";
import * as safekeeper from "../../../app/safekeeper";
import { encrypt } from "../../../common/utils";

type Props = {
  parentId?: string;
};

export function CreateSlotForm({ parentId }: Props) {
  const dispatch = useAppDispatch();
  const { slots, slotMap, refetch } = useBook();

  const { packageId, signAndExecute, isPending } = useSignAndExecute();

  const closeDialog = () => {
    dispatch(closeCreateSlotDialog());
  };

  const createSlot = async (values: UpdateSlotValues) => {
    const tx = new Transaction();

    const key = safekeeper.getKey()!;
    const summary = await encrypt(values.summary, key);
    const content = values.content ? await encrypt(values.content, key) : null;

    tx.moveCall({
      arguments: [
        tx.pure.u64(Date.now()),
        tx.pure.string(summary),
        tx.pure.option("bool", null),
        tx.pure.option("bool", null),
        tx.pure.option("string", content),
        tx.pure.option("u64", null),
        tx.pure.option("vector<address>", values.parents || null),
      ],
      target: `${packageId}::book::create_slot`,
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
      action="Create Slot"
      parents={parentId ? [slotMap[parentId]] : []}
      slots={slots}
      disabled={isPending}
      isAction={isPending}
      onAction={createSlot}
      onCancel={closeDialog}
    />
  );
}
