function grad2d(i, x, y) {
        var v = (i & 1) === 0 ? x : y;
        return (i & 2) === 0 ? -v : v
      }