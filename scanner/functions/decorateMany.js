function decorateMany(source, fns) {
  const olds = {};

  for (const name in fns) {
    olds[name] = decorate(source, name, fns[name]);
  }

  return olds;
}