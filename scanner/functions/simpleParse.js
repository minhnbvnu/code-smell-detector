function simpleParse() {
    for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      keys[_key4] = arguments[_key4];
    }

    return function (match, cursor) {
      var ret = {};
      var i;

      for (i = 0; i < keys.length; i++) {
        ret[keys[i]] = parseInteger(match[cursor + i]);
      }

      return [ret, null, cursor + i];
    };
  }