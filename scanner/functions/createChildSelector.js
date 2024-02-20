function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    }