function _getPathValue (parsed, obj, index) {
    var tmp = obj
      , res;

    index = (index === undefined ? parsed.length : index);

    for (var i = 0, l = index; i < l; i++) {
      var part = parsed[i];
      if (tmp) {
        if ('undefined' !== typeof part.p)
          tmp = tmp[part.p];
        else if ('undefined' !== typeof part.i)
          tmp = tmp[part.i];
        if (i == (l - 1)) res = tmp;
      } else {
        res = undefined;
      }
    }
    return res;
  }