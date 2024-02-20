function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}