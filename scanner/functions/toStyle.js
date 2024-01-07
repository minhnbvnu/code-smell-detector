function toStyle(node, ...names) {
  const style = Object.create(null);

  for (const name of names) {
    const value = node[name];

    if (value === null) {
      continue;
    }

    if (value instanceof _xfa_object.XFAObject) {
      const newStyle = value[_xfa_object.$toStyle]();

      if (newStyle) {
        Object.assign(style, newStyle);
      } else {
        (0, _util.warn)(`(DEBUG) - XFA - style for ${name} not implemented yet`);
      }

      continue;
    }

    if (converters.hasOwnProperty(name)) {
      converters[name](node, style);
    }
  }

  return style;
}