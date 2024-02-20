function unmountComponent(reactComponent) {
  var rootNode = React.findDOMNode(reactComponent);
  var container = rootNode && rootNode.parentNode;

  if (container) {
    var siblings = [];
    var sibling = container.firstChild;

    while (sibling) {
      var next = sibling.nextSibling;
      if (sibling !== rootNode) {
        siblings.push(sibling);
        container.removeChild(sibling);
      }
      sibling = next;
    }

    React.unmountComponentAtNode(container);

    siblings.forEach(function (sib) {
      container.appendChild(sib);
    });
  }
}