import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

type Props = {
  messages: string[];
};

export default function Warning({ messages }: Props) {
  return (
    <div className="rounded-md bg-yellow-50 p-4 dark:bg-slate-950 shadow">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="h-5 w-5 text-yellow-400 dark:text-yellow-700"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-500">
            Attention needed
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-500">
            <ol className="list-decimal">
              {messages.map((x, i) => (
                <li className="p-3" key={i}>{x}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
