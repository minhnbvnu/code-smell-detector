function VirtualElement(tagName) {
  VirtualNode.call(this);
  this.type = 'element';
  this.tagName = tagName;
}