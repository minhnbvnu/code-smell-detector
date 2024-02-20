function setField(name, value) {
    // need to store the initial value via setField in case it's before the
    // input of the given name is rendered.
    if (!initialValues.has(name)) {
      initialValues.set(name, value);
    }
    setFieldState(name, value, true, true);
  }