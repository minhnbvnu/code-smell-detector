function asyncReactDOMRender(reactElement, domElement, forceHydrate) {
    return new Promise(resolve => {
      if (forceHydrate) {
        ReactDOM.hydrate(reactElement, domElement);
      } else {
        ReactDOM.render(reactElement, domElement);
      }
      // We can't use the callback for resolution because that will not catch
      // errors. They're thrown.
      resolve();
    });
  }