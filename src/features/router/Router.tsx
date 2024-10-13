import { Routes, Route, Link } from "react-router-dom";
import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { Layout } from "./layout/Layout";
import { Root } from "../root/Root";
import { Slot } from "../slot/Slot";
import { Dialogs } from "../dialogs/Dialogs";
import { useAppSelector, useSafety } from "../../app/hooks";
import { Decrypt } from "../decrypt/Decrypt";
import { InitSafety } from "../initSafety/InitSafety";
import { ConnectWallet } from "../connectWallet/ConnectWallet";

export function Router() {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const { safety, isPending } = useSafety();
  const decrypted = useAppSelector((state) => state.app.decrypted);

  if (currentWallet.isConnecting) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div />} />
            <Route path="*" element={<div />} />
          </Route>
        </Routes>
      </>
    );
  }

  if (!currentAccount) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ConnectWallet />} />
            <Route path="*" element={<ConnectWallet />} />
          </Route>
        </Routes>
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div />} />
            <Route path="*" element={<div />} />
          </Route>
        </Routes>
      </>
    );
  }

  if (!safety) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<InitSafety />} />
            <Route path="*" element={<InitSafety />} />
          </Route>
        </Routes>
      </>
    );
  }

  if (!decrypted) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Decrypt />} />
            <Route path="*" element={<Decrypt />} />
          </Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Root />} />
          <Route path="slot/:id" element={<Slot />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Dialogs />
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
