function createItemString(data) {
  const len = Object.getOwnPropertyNames(data).length;
  return `${len} ${len !== 1 ? 'keys' : 'key'}`;
}