function getWrapperTag(blockType) {
  switch (blockType) {
    case _main.BLOCK_TYPE.UNORDERED_LIST_ITEM:
      return 'ul';
    case _main.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return 'ol';
    default:
      return null;
  }
}