function intUnit(regex, post) {
    if (post === void 0) {
      post = function post(i) {
        return i;
      };
    }

    return {
      regex: regex,
      deser: function deser(_ref) {
        var s = _ref[0];
        return post(parseDigits(s));
      }
    };
  }