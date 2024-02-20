function registerProp(prop, obj) {
    var data = cx.props[prop] || (cx.props[prop] = []);
    data.push(obj);
  }