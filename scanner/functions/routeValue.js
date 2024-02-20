function routeValue(name, props) {
  let value = {
    name,
    controller: {
      name,
      className: `${classify(name.replace(/\./g, '_'))}Controller`,
      exists: true,
    },
    routeHandler: {
      name,
      className: `${classify(name.replace(/\./g, '_'))}Route`,
    },
    template: {
      name: name.replace(/\./g, '/'),
    },
  };
  props = props || {};
  return deepAssign({}, value, props);
}