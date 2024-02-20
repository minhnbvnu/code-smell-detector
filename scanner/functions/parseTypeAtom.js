function parseTypeAtom(scope, str, pos) {
    var result = parseTypeInner(scope, str, pos);
    if (!result) return null;
    if (str.slice(result.end, result.end + 2) == "[]")
      return {madeUp: result.madeUp, end: result.end + 2, type: new infer.Arr(result.type)};
    else return result;
  }