function constToCamel(word, upperFirst = false) {
  return word
    .split('_')
    .map(function (x, i) {
      return (
        (i || upperFirst ? x[0].toUpperCase() : x[0].toLowerCase()) +
        x.slice(1).toLowerCase()
      );
    })
    .join('');
}