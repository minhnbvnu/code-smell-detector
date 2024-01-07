function createElement(value) {
    // React.createElement replaced function invocation in 0.12
    if (needsCreateElement) {
      return React.createElement(value);
    } else {
      return value();
    }
  }