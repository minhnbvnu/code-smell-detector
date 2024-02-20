function _adjustDict({ dict }) {
  dict._dictItemsMap = {};
  // adjust
  _adjustDict_loop({
    dict,
    dictItemsMap: dict._dictItemsMap,
    dictItems: dict._dictItems,
  });
}