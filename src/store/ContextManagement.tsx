/*
  Exports
  1. StateContext: for components to listen to the application rootStore
  2. StateProvider: uses Context API to define State provider for the application.
  3. subscribe/Observe changes to state in custom State management library and provides the update
      to the application using StateProvider
*/

import React, { createContext, useEffect, useState } from 'react';
import CustomStore from '../../lib/index';
import {
  PartsInterface,
  GlobalStoreObjectInterface,
  StateContextInterface,
} from '../assets/definition/Type.definition';

export const StateContext = createContext<StateContextInterface | null>(null);

const StoreProvider: React.FC = (props) => {
  const { children } = props;
  const [partsList, setPartsList] = useState<PartsInterface[]>([]);

  /*
    callback methods for State library
    1. getPartsFromStore : return the Parts array from global state
    2. mapStateToProps : returns only object as observable as
      defined by consumer , instead of listening to the entire global state object.
      In, our case , we are interested in only listening to Parts[]
  */
  const getPartsFromStore = (state: PartsInterface[]): void =>
    setPartsList(state || []);

  const mapStateToProps = (state: GlobalStoreObjectInterface) => state.parts;

  useEffect(() => {
    /* subscribe/Observe changes to state in custom State management library */
    CustomStore.subscribe(getPartsFromStore, mapStateToProps);
  }, []);

  const addPart = (val: PartsInterface) => {
    const currList: PartsInterface[] = partsList;
    currList.push(val);
    CustomStore.add({ parts: currList });
  };

  const sampleAppContext: StateContextInterface = {
    addPart,
    partsList,
  };

  return (
    <StateContext.Provider value={sampleAppContext}>
      {children}
    </StateContext.Provider>
  );
};

export default StoreProvider;
