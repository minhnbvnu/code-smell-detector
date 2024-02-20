function use(v) {
      var l = _current.variables.filter(function(elt) {
        if (elt.value === v && !elt.undef) {
          if (elt.unused === true) {
            elt.unused = false;
          }
          return v;
        }
      }).length;
      return (l === 0);
    }