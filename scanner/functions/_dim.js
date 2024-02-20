function _dim (x) {
      var ret = [];
      while (typeof x === 'object') { ret.push(x.length); x = x[0]; }
      return ret;
    }