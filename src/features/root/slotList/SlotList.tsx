import { DateTime } from "luxon";
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Badge } from "@trade-project/ui-toolkit";
import { Link } from "react-router-dom";
import { Slot } from "../../../app/types";

type Props = {
  className?: string;
  slots: Slot[];
};

export function SlotList({ className, slots }: Props) {
  return (
    <ul
      role="list"
      className={classNames(
        "text-slate-950 dark:text-white divide-y divide-slate-950/5 dark:divide-white/5 border-b border-slate-950/5 dark:border-white/5",
        className
      )}
    >
      {slots.map((slot) => (
        <li
          key={slot.id}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 hover:bg-slate-950/5 dark:hover:bg-white/5"
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <h2 className="min-w-0 text-sm font-semibold leading-6">
                <Link to={`/slot/${slot.id}`} className="flex gap-x-2">
                  <span className="truncate">{slot.summary}</span>
                  <span className="absolute inset-0" />
                </Link>
              </h2>
            </div>
          </div>
          <Badge color="slate">
            {DateTime.fromMillis(slot.creation).toFormat("dd LLL yyyy")}
          </Badge>
          {/* <ChevronRightIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-slate-400"
          /> */}
        </li>
      ))}
    </ul>
  );
}
