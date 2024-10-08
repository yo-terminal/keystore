import { Slot } from "../../app/types";
import { tryDecrypt } from "./crypto";

export type SlotSource = {
  id: { id: string };
  creation: number;
  summary: string;
  content?: string;
  parents: string[];
};

export type BookModel = {
  slots: Slot[];
  slotMap: Record<string, Slot>;
  parents: Record<string, Slot[]>;
  children: Record<string, Slot[]>;
};

type Link = {
  from: string;
  to: string;
};

export async function getModel(
  sources: SlotSource[],
  archive: boolean,
  key: CryptoKey | null
) {
  let slots: Slot[] = [];

  if (key) {
    slots = await Promise.all(
      sources.map(async (x) => {
        return {
          id: x.id.id,
          creation: Number(x.creation),
          summary: await tryDecrypt(x.summary, key),
          content: x.content ? await tryDecrypt(x.content, key) : undefined,
          parents: x.parents,
        };
      })
    );
  }

  const slotMap: Record<string, Slot> = {};

  slots.forEach((x) => {
    slotMap[x.id] = x;
  });

  const links: Link[] = [];
  slots.forEach((x) => {
    if (x.parents) {
      x.parents.flatMap((y) => {
        links.push({ from: x.id, to: y });
      });
    }
  });

  const parents: Record<string, Slot[]> = {};
  const children: Record<string, Slot[]> = {};

  for (let i = 0; i < links.length; i++) {
    if (!children[links[i].to]) {
      children[links[i].to] = [];
    }
    const child = slotMap[links[i].from];
    if (!!child.archive === archive) {
      children[links[i].to].push(child);
    }

    if (!parents[links[i].from]) {
      parents[links[i].from] = [];
    }
    const parent = slotMap[links[i].to];
    if (parent && !!parent.archive === archive) {
      parents[links[i].from].push(parent);
    }
  }

  Object.keys(children).forEach((id) => {
    children[id].sort((a, b) => a.creation - b.creation);
  });

  return {
    slots: slots.filter((x) => !!x.archive === archive),
    slotMap,
    parents,
    children,
  };
}
