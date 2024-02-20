function _findItem_loop({ dictItemsRes, dictItemsMap, codes }) {
  const code = codes.shift();
  const dictItem = dictItemsMap && dictItemsMap[code];
  if (!dictItem) return false;
  dictItemsRes.push(dictItem);
  if (codes.length === 0) return true;
  return _findItem_loop({
    dictItemsRes,
    dictItemsMap: dictItem._childrenMap,
    codes,
  });
}