function getPropertyValues(container, propertyName) {
  return container.nodes
    .filter(function (node) {
      return node.prop === propertyName;
    })
    .map(function (node) {
      return node.value;
    });
}