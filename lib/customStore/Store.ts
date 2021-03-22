/**
 * Base class for custom Store Libtrary
 * Maintains a global Immutable application State object
 * uses : Publish-Subscribe method to register and emit updates/events
 * Methods Exposed :
 * get() : To return the Immutable global State object
 * add() : To add object to the global object
 * subscribe(callbackFunction, objectToObserve) : Consumers can subscribe to updates.
 *    callbackFunction -> A callback function to send updates to the consumer
 *    objectToObserve -> a function to specify the observable part of the global
 *    application object. similar to "React-redux connect method".
 */
import { clone, isObject } from '../helper/utils';
import PublishSubscribe from './PublishSubscribe';
import {
  GlobalStoreObjectInterface,
  ObserveCallbackType,
  PublishCallbackType,
} from '../definition/Type.definition';

class Store {
  /* Private members of Store class */
  #store: GlobalStoreObjectInterface;

  #pubsub;

  /* make this class singleton */
  static instance: Store;

  static getInstance(val?: GlobalStoreObjectInterface): Store {
    if (!Store.instance) {
      Store.instance = new Store(val || {});
    }
    return Store.instance;
  }

  constructor(initialState = {}) {
    if (!isObject(initialState))
      throw new Error('initial state must be a object');
    this.#store = initialState;
    this.#pubsub = new PublishSubscribe();
  }

  /**
   * get() : Return the Immutable copy of Application Object
   */
  get store(): Record<string, unknown> {
    return clone(this.#store);
  }

  /**
   * add() :
      adds the object to the Application State object
      Publishes the object update to the consumers via Publish method
   * @param value : Valid JSON Object
   */
  add(value: GlobalStoreObjectInterface): void {
    if (!isObject(value)) throw new Error('Only Objects can be added');
    const currentState = clone(this.#store);
    const nextState = Object.assign(clone(currentState), clone(value));
    this.#pubsub.publish(currentState, nextState);
    this.#store = clone(nextState);
  }

  /**
   *
   * @param state : Callback function to be called passing updated object to the consumer
   *
   * @param mapStateToProps : Config function, to define the observable part of the object.
   *  similar to React-redux connect method.
   * @returns
   */
  subscribe(
    state: PublishCallbackType,
    mapStateToProps?: ObserveCallbackType,
  ): void {
    this.#pubsub.subscribe(state, mapStateToProps);
  }
}

export default Store;
