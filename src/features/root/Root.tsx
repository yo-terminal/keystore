import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector, useBook } from "../../app/hooks";
import { openCreateSlotDialog } from "../dialogs/createSlotDialog/createSlotDialogSlice";
import { setMaxItem, setSearchQuery } from "./rootSlice";
import { search } from "../../common/utils";
import { Input, InputGroup } from "../../common/components/input";
import { Button } from "../../common/components/button";
import { SlotList } from "./slotList/SlotList";
import { Empty } from "./empty/Empty";

export function Root() {
  const dispatch = useAppDispatch();
  const { slots, parents } = useBook();
  const searchQuery = useAppSelector((state) => state.root.searchQuery);
  const maxItem = useAppSelector((state) => state.root.maxItem);

  const roots = searchQuery
    ? search(slots, searchQuery)
    : slots.filter((x) => x.root || !parents[x.id]?.length);

  const displayRoots = roots.slice(0, maxItem);
  const hasMore = roots.length > displayRoots.length;

  if (slots.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4 items-center">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search&hellip;"
                  value={searchQuery}
                  onChange={(e) => {
                    dispatch(setSearchQuery(e.target.value));
                  }}
                />
              </InputGroup>
            </div>
            {/* <div>
              <Select name="sort_by">
                <option value="">Sort by...</option>
                <option value="date:up">Date up</option>
                <option value="date:down">Date down</option>
              </Select>
            </div> */}
          </div>
        </div>
        <Button
          onClick={() => {
            dispatch(openCreateSlotDialog({}));
          }}
        >
          <PlusIcon />
          New
        </Button>
      </div>
      <SlotList className="mt-8" slots={displayRoots} />
      {hasMore && (
        <div className="pt-6 flex justify-center">
          <Button
            plain
            onClick={() => {
              dispatch(setMaxItem(maxItem + 30));
            }}
          >
            more...
          </Button>
        </div>
      )}
    </>
  );
}
