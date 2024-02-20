function ModuleRange(node) {
  Range.call(this, node.start, node.end);

  this.kind = node.kind;
  this.key = JSON.stringify(node.key.name || node.key.value);
  this.value = {
    start: node.value.start - this.start,
    end: node.value.end - this.end
  };
}