function toDenseArray(x) {
  return [].concat(x).filter(y => y !== undefined);
}