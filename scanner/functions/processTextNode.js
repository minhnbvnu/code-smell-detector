function processTextNode({
  object,
  node,
  textNode,
  eventOptions
}) {
  const { bindingReg } = parserData;
  const { textContent } = textNode;
  const { document } = window;

  bindingReg.lastIndex = 0;

  // tokens variable contains normal text as odd items
  // and bound keys as even items
  // 'foo{{x}}bar{{y}}baz{{z}}' -> ['foo', 'x', 'bar', 'y', 'baz', 'z', '']
  const tokens = textContent.split(bindingReg);

  // fragment contains all new text nodes
  const fragment = document.createDocumentFragment();

  forEach(tokens, (token, index) => {
    if (token) {
      const newTextNode = document.createTextNode(token);
      fragment.appendChild(newTextNode);

      // if tokens item is even then it is a key
      // which needs to be bound to newly created text node
      if (index % 2 !== 0) {
        bindNode(object, token, newTextNode, textNodeBinder, eventOptions);
      }
    }
  });

  node.insertBefore(fragment, textNode);
  node.removeChild(textNode);
}