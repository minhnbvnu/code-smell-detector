function _adjustDict_loop({ dict, dictItemsMap, dictItems }) {
  for (const item of dictItems) {
    // self
    dictItemsMap[item.code] = item;
    // children
    if (item.children) {
      item._childrenMap = {};
      _adjustDict_loop({
        dict,
        dictItemsMap: item._childrenMap,
        dictItems: item.children,
      });
    }
  }
}