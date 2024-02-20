function create$3(e) {
    I[e.name.toLowerCase()] = {
      test: function test(t) {
        return toStringTag(t) === e.name;
      },
      replace: function replace(e) {
        return {
          x: e.x,
          y: e.y,
          width: e.width,
          height: e.height
        };
      },
      revive: function revive(_ref6) {
        var t = _ref6.x,
          r = _ref6.y,
          n = _ref6.width,
          a = _ref6.height;
        return new e(t, r, n, a);
      }
    };
  }