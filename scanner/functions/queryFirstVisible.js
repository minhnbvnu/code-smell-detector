function queryFirstVisible(parent, field, form) {
    var elems = queryAllVisible(parent, field, form);
    return elems.length > 0 ? elems[0] : undefined;
  }