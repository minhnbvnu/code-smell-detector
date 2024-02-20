function getInitialValue(name) {
    return initialValues.has(name)
      ? initialValues.get(name)
      : initialState[name];
  }