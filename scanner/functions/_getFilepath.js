function _getFilepath(item, itemPath, wanted) {
  if (item === wanted) {
    return itemPath;
  }
  if (item instanceof Directory) {
    for (const name of item.list()) {
      const got = _getFilepath(
        item.getItem(name),
        path.join(itemPath, name),
        wanted
      );
      if (got) {
        return got;
      }
    }
  }
  return null;
}