function isPDFFunction(v) {
  var fnDict;

  if (typeof v !== "object") {
    return false;
  } else if ((0, _primitives.isDict)(v)) {
    fnDict = v;
  } else if ((0, _primitives.isStream)(v)) {
    fnDict = v.dict;
  } else {
    return false;
  }

  return fnDict.has("FunctionType");
}