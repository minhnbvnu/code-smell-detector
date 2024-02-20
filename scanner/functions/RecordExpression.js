function RecordExpression(node) {
  const props = node.properties;
  let startToken;
  let endToken;

  if (this.format.recordAndTupleSyntaxType === "bar") {
    startToken = "{|";
    endToken = "|}";
  } else if (this.format.recordAndTupleSyntaxType === "hash") {
    startToken = "#{";
    endToken = "}";
  } else {
    throw new Error(`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`);
  }

  this.token(startToken);
  this.printInnerComments(node);

  if (props.length) {
    this.space();
    this.printList(props, node, {
      indent: true,
      statement: true
    });
    this.space();
  }

  this.token(endToken);
}