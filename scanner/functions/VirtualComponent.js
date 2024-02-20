function VirtualComponent(ComponentClass) {
  VirtualNode.call(this);
  this.type = 'component';
  this.ComponentClass = ComponentClass;
}