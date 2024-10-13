import { PlusIcon } from "@heroicons/react/20/solid";
import { Button, Heading, Divider, Text } from "@trade-project/ui-toolkit";
import { useAppDispatch } from "../../../app/hooks";
import { openCreateSlotDialog } from "../../dialogs/createSlotDialog/createSlotDialogSlice";

export function Empty() {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto max-w-3xl">
      <Heading>No slots</Heading>
      <Divider className="my-10 mt-6" soft />

      <div className="flex gap-4 items-center">
        <Button
          onClick={() => {
            dispatch(openCreateSlotDialog({}));
          }}
        >
          <PlusIcon />
          New Slot
        </Button>
        <Text>Get started by creating a new slot.</Text>
      </div>
    </div>
  );
}
