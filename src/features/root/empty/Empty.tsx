import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../common/components/button";
import { Heading } from "../../../common/components/heading";
import { Divider } from "../../../common/components/divider";
import { Text } from "../../../common/components/text";
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
