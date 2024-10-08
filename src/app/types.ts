export type Slot = {
  id: string;
  creation: number;
  summary: string;
  content?: string;
  archive?: boolean;
  root?: boolean;
  parents?: string[];
};

export type UpdateSlotValues = Omit<Slot, "id" | "creation">;

export type Safety = {
  salt: string;
  verify: {
    hash: string;
    salt: string;
  };
};
