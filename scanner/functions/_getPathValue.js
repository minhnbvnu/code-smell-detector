function _getPathValue (parsed, obj) {
      var tmp = obj
        , res;
      for (var i = 0, l = parsed.length; i < l; i++) {
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