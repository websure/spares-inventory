# SparesCNX Dashboard for Parts : SparesCNX Frontend Test Assignment

## About the Assignment : (Custom State Management Store)

- Create a custom State management library using Vanilla JS
- Library should provide update to the consumer on state change

### Stack

    Javascript

### Bootstrapping Application

- clone the project : git clone https://github.com/websure/spares-inventory.git
- Usage : import CustomStore from 'your/path/lib/index';

### Features

- A small JS library to save and retrive JSON objects
- The library is based on 'Pub-Sub' paradigm
- Callbacks are used for listening to the updates
- Singleton Class
- Immutable Application Object

### Methods Exposed

- subscribe(callback, mapStateToProps) => void

  - Consumers register the callback and config functions.
  - @param callback : Register the consumer callback function, to be triggered
    on object update
  - @param mapStateToProps : Config for observable part. similar to React-redux
    connect method
  - Sample Usage -- CustomStore.subscribe(getPartsFromStore, mapStateToProps);

- add(object) => void
  - adds the object to the Application State object
  - Publishes the object update to the consumers via Publish method
  - Sample Usage -- CustomStore.add({ parts: currList });

### caveats

- TODO - Add test cases and implement Integration tests
- As for assignment, only add and update method is implemented.
