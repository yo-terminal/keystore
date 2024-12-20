import { memo } from "react";

function Logo() {
  return (
    <svg
      className="w-auto h-7"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -32 576 576"
    >
      <path
        fill="#2563eb"
        d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
      />
    </svg>
  );
}

export default memo(Logo);
