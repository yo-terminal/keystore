import { Modal } from "@trade-project/ui-toolkit";
import { closeCreateSlotDialog } from "./createSlotDialogSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CreateSlotForm } from "./CreateSlotForm";

export function CreateSlotDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialogs.createSlotDialog.open);
  const openParams = useAppSelector(
    (state) => state.dialogs.createSlotDialog.openParams
  );

  if (!openParams) {
    return null;
  }

  const closeDialog = () => {
    dispatch(closeCreateSlotDialog());
  };

  return (
    <Modal title="Create Slot" size="2xl" open={open} onClose={closeDialog}>
      <CreateSlotForm parentId={openParams.parentId} />
    </Modal>
  );
}
