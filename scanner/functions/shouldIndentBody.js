function shouldIndentBody(node, opts) {
  var bodyFirstNonEmpty = tk.findNextNonEmpty(node.body.startToken);

  if (bodyFirstNonEmpty.value === '}') {
    // noop
    limit.after(node.body.startToken, 0);
    return false;
  } else {
    // we don't want to indent the body twice if ObjectExpression or
    // ArrayExpression or CallExpression
    return node.body.type === 'BlockStatement' || !opts[node.body.type];
  }
}