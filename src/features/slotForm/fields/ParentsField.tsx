import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  XMarkIcon,
  LinkIcon,
  LinkSlashIcon,
} from "@heroicons/react/20/solid";
import { useFieldArray, Control } from "react-hook-form";
import { Slot } from "../../../app/types";
import { search } from "../../../common/utils";

export type ParentValues = { slotId: string; summary: string };

export function ParentsField({
  className,
  control,
  name,
  slots,
  currentSlotId,
}: {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  name: string;
  slots: Slot[];
  currentSlotId?: string;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const parents = fields as unknown[] as (ParentValues & { id: string })[];

  const excludeSet = new Set(parents.map((x) => x.slotId));
  if (currentSlotId) {
    excludeSet.add(currentSlotId);
  }

  const searchedNotes = search(slots, searchQuery, excludeSet);

  return (
    <div className={className}>
      <div className="text-base font-medium text-white">Parents</div>
      <div className="py-4 w-full relative">
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-500"
        />
        <input
          name="search"
          type="search"
          placeholder="Search..."
          className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div className="mt-1 grid grid-cols-2 grid-rows-1 border border-slate-800 rounded-lg overflow-hidden">
        <div className="text-sm overflow-y-auto max-h-40 min-h-40 border-r border-slate-800">
          <ul role="list" className="divide-y divide-white/5">
            {searchedNotes.map((x) => (
              <li
                key={x.id}
                className="relative flex items-center space-x-4 py-3 px-3 hover:bg-slate-800"
                title="Link as parent"
              >
                <div className="flex w-0 flex-1 items-center">
                  <div className="flex min-w-0 flex-1 gap-2">
                    <LinkSlashIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-slate-600"
                    />
                    <span className="truncate font-medium">{x.summary}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={() => {
                      append({
                        slotId: x.id,
                        summary: x.summary,
                      });
                    }}
                  >
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-slate-400"
                    />
                    <span className="absolute inset-0" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm overflow-y-auto max-h-40 min-h-40">
          <ul role="list" className="divide-y divide-white/5">
            {parents.map((x, i) => (
              <li
                key={x.id}
                className="relative flex items-center space-x-4 py-3 px-3 hover:bg-slate-800"
                title="Unlink parent"
              >
                <div className="flex w-0 flex-1 items-center">
                  <div className="flex min-w-0 flex-1 gap-2">
                    <LinkIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-emerald-600"
                    />
                    <span className="truncate font-medium">{x.summary}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={() => {
                      remove(i);
                    }}
                  >
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-slate-400"
                    />
                    <span className="absolute inset-0" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}