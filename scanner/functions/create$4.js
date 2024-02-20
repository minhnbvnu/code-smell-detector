function create$4(e) {
    T[e.name.toLowerCase()] = {
      test: function test(t) {
        return toStringTag(t) === e.name;
      },
      replace: function replace(e) {
        return {
          x: e.x,
          y: e.y,
          z: e.z,
          w: e.w
        };
      },
      revive: function revive(_ref4) {
        var t = _ref4.x,
          r = _ref4.y,
          n = _ref4.z,
          a = _ref4.w;
        return new e(t, r, n, a);
      }
    };
  }