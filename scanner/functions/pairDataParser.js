function pairDataParser(node, objectStack) {
  const pairObject = pushParseAndPop({}, PAIR_PARSERS, node, objectStack, this);
  if (!pairObject) {
    return;
  }
  const key = /** @type {string|undefined} */ (pairObject['key']);
  if (key && key == 'normal') {
    const styleUrl = /** @type {string|undefined} */ (pairObject['styleUrl']);
    if (styleUrl) {
      objectStack[objectStack.length - 1] = styleUrl;
    }
    const style = /** @type {Style} */ (pairObject['Style']);
    if (style) {
      objectStack[objectStack.length - 1] = style;
    }
  }
}