import { Modal } from "@trade-project/ui-toolkit";
import { closeUpdateSlotDialog } from "./updateSlotDialogSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UpdateSlotForm } from "./UpdateSlotForm";

export function UpdateSlotDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialogs.updateSlotDialog.open);
  const openParams = useAppSelector(
    (state) => state.dialogs.updateSlotDialog.openParams
  );

  if (!openParams) {
    return null;
  }

  const closeDialog = () => {
    dispatch(closeUpdateSlotDialog());
  };

  return (
    <Modal title="Update Slot" size="2xl" open={open} onClose={closeDialog}>
      <UpdateSlotForm slotId={openParams.slotId} />
    </Modal>
  );
}
