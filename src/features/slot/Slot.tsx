import { DateTime } from "luxon";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useBook, useSignAndExecute } from "../../app/hooks";
import { openCreateSlotDialog } from "../dialogs/createSlotDialog/createSlotDialogSlice";
import { openUpdateSlotDialog } from "../dialogs/updateSlotDialog/updateSlotDialogSlice";
import { Heading } from "../../common/components/heading";
import { Badge } from "../../common/components/badge";
import { Button } from "../../common/components/button";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../../common/components/dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { SubSlotList } from "./subSlotList/SubSlotList";
import { Transaction } from "@mysten/sui/transactions";

export function Slot() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const slotId = String(id);
  const navigate = useNavigate();
  const book = useBook();
  const slotMap = book.slotMap;
  const children = book.children[slotId] || [];

  const slot = slotMap[slotId] || { creation: Date.now() };

  const { packageId, signAndExecute } = useSignAndExecute();

  const removeSlot = () => {
    const tx = new Transaction();

    tx.moveCall({
      arguments: [tx.object(slotId)],
      target: `${packageId}::book::remove_slot`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          navigate(-1); // todo
          setTimeout(() => {
            book.refetch();
          }, 500);
          setTimeout(() => {
            book.refetch();
          }, 1500);
        },
        onError: () => {
          alert("Something went wrong");
        },
      }
    );
  };

  return (
    <>
      <div className="flex gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-base sm:text-sm/6 text-slate-500 dark:text-slate-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeftIcon className="size-5 sm:size-4 fill-slate-400 dark:fill-slate-500" />
          Back
        </button>
        <div className="sm:hidden flex ml-auto gap-1">
          <Button
            // color="blue"
            onClick={() => {
              dispatch(openCreateSlotDialog({ parentId: slotId }));
            }}
          >
            <PlusIcon />
            Sub-slot
          </Button>
          <Dropdown>
            <DropdownButton aria-label="More options">
              <EllipsisVerticalIcon />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              <DropdownItem
                onClick={() => {
                  dispatch(openUpdateSlotDialog({ slotId: slotId }));
                }}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    removeSlot();
                  }
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{slot.summary}</Heading>
          <Badge color="slate">
            {DateTime.fromMillis(slot.creation).toFormat("dd LLL yyyy")}
          </Badge>
          <div className="hidden sm:flex ml-auto gap-1">
            <Button
              // color="blue"
              onClick={() => {
                dispatch(openCreateSlotDialog({ parentId: slotId }));
              }}
            >
              <PlusIcon />
              Sub-slot
            </Button>
            {/* <Button
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  removeSlot(id)
                    .unwrap()
                    .then(() => {
                      navigate(-1); // todo
                    });
                }
              }}
            >
              {isLoading && <Spin className="-ml-1 mr-2" />}
              Remove
            </Button> */}
            {/* <Button
              color="blue"
              onClick={() => {
                dispatch(openUpdateSlotDialog({ slotId: id }));
              }}
            >
              Edit
            </Button> */}
            <Dropdown>
              <DropdownButton aria-label="More options">
                <EllipsisVerticalIcon />
              </DropdownButton>
              <DropdownMenu anchor="bottom end">
                {/* <DropdownItem
                  onClick={() => {
                    dispatch(openCreateSlotDialog({ parentId: id }));
                  }}
                >
                  New
                </DropdownItem> */}
                <DropdownItem
                  onClick={() => {
                    dispatch(openUpdateSlotDialog({ slotId }));
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      removeSlot();
                    }
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      {slot?.content && (
        <div className="mt-4 lg:mt-8">
          {/* <Subheading>Content:</Subheading> */}
          <pre className="py-4 px-5 bg-slate-100 dark:bg-slate-950 rounded-lg text-yellow-700 dark:text-yellow-400">
            {slot?.content}
          </pre>
        </div>
      )}
      {!slot?.content && children.length === 0 && (
        <div className="py-16 text-sm font-semibold text-slate-500 dark:text-slate-400 text-center">No content</div>
      )}
      {children.length > 0 && (
        <div className="mt-12">
          {/* <Subheading>Children</Subheading> */}
          <SubSlotList className="mt-2" slots={children} />
        </div>
      )}
    </>
  );
}
