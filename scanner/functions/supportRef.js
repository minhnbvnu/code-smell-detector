function supportRef(nodeOrComponent) {
  // Function component node
  if (nodeOrComponent.type && nodeOrComponent.type.prototype && !nodeOrComponent.type.prototype.render) {
    return false;
  } // Class component

  if (typeof nodeOrComponent === 'function' && nodeOrComponent.prototype && !nodeOrComponent.prototype.render) {
    return false;
  }
  return true;
}