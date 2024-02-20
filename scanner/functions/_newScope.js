function _newScope(type) {
    _current = {
      "(labels)": Object.create(null),
      "(usages)": Object.create(null),
      "(breakLabels)": Object.create(null),
      "(parent)": _current,
      "(type)": type,
      "(params)": (type === "functionparams" || type === "catchparams") ? [] : null
    };
    _scopeStack.push(_current);
  }