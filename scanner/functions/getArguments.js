function getArguments(func) {
  const source = func.toString();
  const argsList = source.match(/\(([^()]*)\)/);
  if (argsList && argsList[1]) {
    return argsList[1].split(/,\s*/);
  }
  return [];
}