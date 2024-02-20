function parseSelectorIndexes(allIndexes, selector) {
  allIndexes = allIndexes.slice(0).concat(allIndexes['default']);

  var allIndexesLen = allIndexes.length,
    i,
    j,
    m,
    dup,
    rest = selector,
    key,
    index,
    indexes = [];

  do {
    chunker.exec('');
    if ((m = chunker.exec(rest))) {
      rest = m[3];
      if (m[2] || !rest) {
        for (i = 0; i < allIndexesLen; i++) {
          index = allIndexes[i];
          if ((key = index.selector(m[1]))) {
            j = indexes.length;
            dup = false;
            while (j--) {
              if (indexes[j].index === index && indexes[j].key === key) {
                dup = true;
                break;
              }
            }
            if (!dup) {
              indexes.push({ index: index, key: key });
            }
            break;
          }
        }
      }
    }
  } while (m);

  return indexes;
}