function writeFilter(filter, version) {
  version = version || '1.1.0';
  const child = createElementNS(getFilterNS(version), 'Filter');
  const context = {
    node: child,
  };
  Object.assign(context, {
    'version': version,
    'filter': filter,
  });
  writeFilterCondition(child, filter, [context]);
  return child;
}