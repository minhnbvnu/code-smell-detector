function toSeempleArray(arrayLike) {
  // fix circular dependency issue
  const SeempleArray = require('./').default;

  const result = new SeempleArray(arrayLike.length);

  forEach(arrayLike, (item, index) => {
    result[index] = item;
  });

  return result;
}