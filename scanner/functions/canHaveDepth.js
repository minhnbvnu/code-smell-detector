function canHaveDepth(blockType) {
  switch (blockType) {
    case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return true;
    default:
      return false;
  }
}