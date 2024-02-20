function Container() {
  Node.apply(this, arguments);
  this.components = [];
  this.nodeComponents = {};
  this.byPath = new PathAdapter({});
}