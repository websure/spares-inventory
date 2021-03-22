/**
 * PublishSubscribe Class
 *  This calls provides functions for registering config, callback functions of consumers
 */
import { isObject, isEqual } from '../helper/utils';
import {
  GlobalStoreObjectInterface,
  ObserveCallbackType,
  PublishCallbackType,
} from '../definition/Type.definition';

class PublishSubscribe {
  #publishStore;

  constructor() {
    this.#publishStore = [];
  }

  /**
   * publish() : Calls the callback function .
   *    if config Fuction is provided : return only the config part of the object
   *    if No config function : returns the entire application State
   * @param currentState : Current Application Object
   *
   * @param nextState : Application object after recent update
   */
  publish(
    currentState: GlobalStoreObjectInterface, // Record<string, unknown>,
    nextState: GlobalStoreObjectInterface, // Record<string, unknown>,
  ): void {
    if (!isObject(currentState))
      throw new Error('currentState should be and object');
    if (!isObject(nextState)) throw new Error('nextState should be and object');

    this.#publishStore.forEach((item) => {
      if (item.mapStateToProps) {
        const currentValue = item?.mapStateToProps(currentState);
        const nextValue = item.mapStateToProps(nextState);
        if (!isEqual(currentValue, nextValue)) {
          // console.debug('from lib :publishing ', nextValue);
          item.callback(nextValue);
        }
      } else {
        item.callback(nextState);
      }
    });
  }

  /**
   * subscribe() : Consumers register the callback and config functions.
   * @param callback : Register the consumer callback function, to be triggered on object update
   *
   * @param mapStateToProps : Config for observable part. similar to React-redux connect method
   */
  subscribe(
    callback: PublishCallbackType,
    mapStateToProps?: ObserveCallbackType,
  ): void {
    if (typeof callback !== 'function')
      throw new Error('config should be a function');
    if (mapStateToProps && typeof mapStateToProps !== 'function')
      throw new Error('mapStateToProps config should be a function');
    this.#publishStore.push({ callback, mapStateToProps });
    // console.debug('subscribing ', this.#publishStore);
  }
}

export default PublishSubscribe;
