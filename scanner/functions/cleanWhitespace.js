function cleanWhitespace(element) {
    element = $(element);
    var node = element.firstChild;

    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  }