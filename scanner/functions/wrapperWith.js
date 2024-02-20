function wrapperWith(P, maps) {
  var R = function R(type, props, children) {
    return create(R.get(type), props, children);
  };

  R.get = function (type) {
    if (typeof type === 'string') {
      var temp = getComponent(maps, type);

      if (temp) {
        return temp;
      }
    }

    return P.get(type);
  };

  R.wrapperWith = function (xmaps) {
    return wrapperWith(R, xmaps);
  };

  R.register = function (type, Component) {
    return register(maps, type, Component);
  };

  return R;
}