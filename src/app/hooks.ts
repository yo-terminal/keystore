import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import type { RootState, AppDispatch } from "./store";
import { getModel, SlotSource } from "../common/utils";
import { useNetworkVariable } from "./networkConfig";
import { Safety } from "./types";
import * as safekeeper from "./safekeeper";
import { setModel } from "./appSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBook() {
  const dispatch = useAppDispatch();
  const { objects, isPending, error, refetch } =
    useOwnedObjects<SlotSource>("Slot");
  const archive = useAppSelector((state) => state.app.archive);
  const decrypted = useAppSelector((state) => state.app.decrypted);
  const model = useAppSelector((state) => state.app.model);

  useEffect(() => {
    getModel(objects || [], archive, safekeeper.getKey()).then((x) => {
      dispatch(setModel(x));
    });
  }, [objects, archive, decrypted, dispatch]);

  return { isPending, error, refetch, ...model };
}

export function useSafety() {
  const { objects, isPending, error, refetch } = useOwnedObjects<{
    id: { id: string };
    salt: string;
    verifyHash: string;
    verifySalt: string;
  }>("Safety");

  const obj = objects?.[0];
  let safety: Safety | null = null;

  if (obj) {
    safety = {
      salt: obj.salt,
      verify: {
        hash: obj.verifyHash,
        salt: obj.verifySalt,
      },
    };
  }

  return {
    isPending,
    error,
    safety,
    refetch,
  };
}

export function useOwnedObjects<T>(type: "Safety" | "Slot") {
  const packageId = useNetworkVariable("packageId");
  const account = useCurrentAccount();
  const { data, isPending, error, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showType: true,
        showContent: true,
      },
    },
    {
      enabled: !!account,
    }
  );

  const objects = useMemo(() => {
    return (
      (
        data?.data.filter(
          (object) => object.data?.type === `${packageId}::book::${type}`
        ) || []
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((x) => (x.data!.content as any).fields as T)
    );
  }, [data?.data, packageId, type]);

  return {
    objects,
    isPending,
    error,
    refetch,
  };
}

export function useSignAndExecute() {
  const packageId = useNetworkVariable("packageId");
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isPending,
    error,
  } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  return {
    packageId,
    signAndExecute,
    isPending,
    error,
  };
}
