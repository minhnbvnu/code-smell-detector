function ExportsRange(node, isStatement) {
  Range.call(this, node.start, node.end);
  this.isStatement = isStatement;
  this.right = {
    start: node.right.start - this.start,
    end: node.right.end - this.end
  };
}