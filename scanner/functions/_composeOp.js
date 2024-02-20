function _composeOp(a2, b, func) {
  function _nonFunctionObject(x2) {
    return x2 instanceof Object && !(x2 instanceof Function);
  }

  if (_nonFunctionObject(a2) || _nonFunctionObject(b)) {
    if (!_nonFunctionObject(a2)) {
      a2 = {
        value: a2
      };
    }

    if (!_nonFunctionObject(b)) {
      b = {
        value: b
      };
    }

    return unionWithObj(a2, b, func);
  }

  return func(a2, b);
}