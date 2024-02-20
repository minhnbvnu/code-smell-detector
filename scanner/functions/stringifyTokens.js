function stringifyTokens(splits, tokenToString) {
    var s = "";

    for (var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done;) {
      var token = _step.value;

      if (token.literal) {
        s += token.val;
      } else {
        s += tokenToString(token.val);
      }
    }

    return s;
  }