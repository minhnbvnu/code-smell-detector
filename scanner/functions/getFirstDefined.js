function getFirstDefined(...params) {
  return params.find((val) => val !== undefined);
}