import { getCryptoKey, verify } from "../common/utils";
import { closeCreateSlotDialog } from "../features/dialogs/createSlotDialog/createSlotDialogSlice";
import { closeUpdateSlotDialog } from "../features/dialogs/updateSlotDialog/updateSlotDialogSlice";
import { setDecrypted } from "./appSlice";
import { Safety } from "./types";
import { store } from "./store";

let key: CryptoKey | null = null;
let timeoutId: NodeJS.Timeout | null = null;

window.document.addEventListener("click", () => {
  keepAlive();
});

export async function setPassword(password: string, safety: Safety) {
  if (!(await verify(password, safety.verify.hash, safety.verify.salt))) {
    return false;
  }
  key = (await getCryptoKey(password, safety.salt)).key;
  store.dispatch(setDecrypted(true));
  keepAlive();
  return true;
}

export function getKey() {
  return key;
}

export function reset() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  key = null;
  store.dispatch(setDecrypted(false));
}

function keepAlive() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  if (key) {
    timeoutId = setTimeout(() => {
      key = null;
      store.dispatch(closeCreateSlotDialog());
      store.dispatch(closeUpdateSlotDialog());
      store.dispatch(setDecrypted(false));
    }, 1000 * 60 * 30);
  }
}
