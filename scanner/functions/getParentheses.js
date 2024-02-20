function getParentheses(node) {
  if (!isValidExpression(node)) {
    debug('not valid expression: %s', node.type);
    return;
  }

  var opening = node.startToken;
  if (!opening) {
    debug('no opening: %s', node.type);
    return;
  }

  if (/^(?:Binary|Logical)Expression$/.test(node.type) || opening.value !== '(') {
    opening = _tk.findPrevNonEmpty(opening);
  }

  if (!opening || opening.value !== '(') {
    // "safe" to assume it is not inside parentheses
    debug(
      'opening is not a parentheses; type: %s, opening: "%s"',
      node.type,
      opening && opening.value
    );
    return;
  }

  var token = opening;
  var count = 0;
  var closing;

  while (token) {
    if (token.value === '(') {
      count += 1;
    } else if (token.value === ')') {
      count -= 1;
    }
    if (count === 0) {
      closing = token;
      break;
    }
    token = token.next;
  }

  if (!closing) {
    debug('not inside parentheses', count);
    return;
  }

  // make sure ")" is wrapping expression, for cases like `(foo) => bar()`
  if (
    closing !== node.endToken &&
    _tk.findPrev(closing, _tk.isCode) !== node.endToken &&
    _tk.findNext(closing, _tk.isCode) !== node.endToken
  ) {
    return;
  }

  debug(
    'found parentheses; type: %s, opening: "%s", closing: "%s"',
    node.type,
    opening && opening.value,
    closing && closing.value
  );

  return {
    opening: opening,
    closing: closing
  };
}