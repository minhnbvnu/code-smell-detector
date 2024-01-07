function readIcon(node, objectStack) {
  const iconObject = pushParseAndPop({}, ICON_PARSERS, node, objectStack);
  if (iconObject) {
    return iconObject;
  }
  return null;
}