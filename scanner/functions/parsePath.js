function parsePath(path) {
    var str = path.replace(/([^\\])\[/g, '$1.[');
    var parts = str.match(/(\\\.|[^.]+?)+/g);
    return parts.map(function mapMatches(value) {
      var regexp = /^\[(\d+)\]$/;
      var mArr = regexp.exec(value);
      var parsed = null;
      if (mArr) {
        parsed = { i: parseFloat(mArr[1]) };
      } else {
        parsed = { p: value.replace(/\\([.\[\]])/g, '$1') };
      }

      return parsed;
    });
  }