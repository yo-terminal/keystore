import { memo } from "react";
import { CreateSlotDialog } from "./createSlotDialog/CreateSlotDialog";
import { UpdateSlotDialog } from "./updateSlotDialog/UpdateSlotDialog";

export const Dialogs = memo(function Dialogs() {
  return (
    <>
      <CreateSlotDialog />
      <UpdateSlotDialog />
    </>
  );
});
