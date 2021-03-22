interface PartsInterface {
  id: string;
  name: string;
  status: string;
}

interface GlobalStoreObjectInterface {
  parts: PartsInterface[];
  [fieldName: string]: unknown;
}

interface StateContextInterface {
  addPart: (val: PartsInterface) => void;
  partsList: PartsInterface[];
}

export type {
  PartsInterface,
  GlobalStoreObjectInterface,
  StateContextInterface,
};
