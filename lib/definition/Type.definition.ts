/**
 *  All types of the library are defined here
 *
 */
interface GlobalStoreObjectInterface {
  [fieldName: string]: unknown;
}

type ObserveCallbackType = (obj: any) => any;
type PublishCallbackType = (obj: any) => void;

export type {
  GlobalStoreObjectInterface,
  ObserveCallbackType,
  PublishCallbackType,
};
