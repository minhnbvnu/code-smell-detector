function parseBindings(object, givenNodes, eventOptions) {
  if (typeof this === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args
    /* eslint-disable no-param-reassign */
    eventOptions = givenNodes;
    givenNodes = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    checkObjectType(object, 'parseBindings');
  }

  const extendedEventOptions = {
    // useExactBinder is little optimization
    // without this option used binder is extended by default binder
    useExactBinder: true,
    fromParser: true,
    setValueOnBind: true
  };

  if (typeof eventOptions === 'object') {
    assign(extendedEventOptions, eventOptions);
  }

  let nodes;
  const allNodes = [];
  // extract all needed data from parserData
  // check out what is parserData in its module
  const {
    leftBracket,
    bindingReg
  } = parserData;

  if (typeof givenNodes === 'string') {
    if (~givenNodes.indexOf('<')) {
      // this is HTML
      nodes = dom.$.parseHTML(givenNodes);
      if (!~givenNodes.indexOf(leftBracket)) {
        // if it doesn't include parser bracket then we don't need to check
        // their existence for all included nodes in cycle below
        return nodes;
      }
    } else {
      // this is a selector
      nodes = getNodes(object, givenNodes);
    }
  } else if (typeof givenNodes === 'object') {
    // this is a node, nodeList or something else (eg array, jQuery instance etc)
    nodes = dom.$(givenNodes);
  }

  // to make possible to not use recursion we're collecting all nodes to allNodes array
  forEach(nodes, (node) => allNodes.push(node));

  // on every cycle of array we're adding new descendants to allNodes
  // increasing # of needed iterations
  for (let i = 0; i < allNodes.length; i++) {
    const node = allNodes[i];
    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;

    // allow to parse elements only
    if (node.nodeType !== ELEMENT_NODE) {
      continue;
    }

    const {
      outerHTML, innerHTML, childNodes, attributes
    } = node;


    // if outerHTML does't contain left bracket, then this node doesn't need to be parsed
    // we may need to check outerHTML existence for older browsers
    // we may need to add !~outerHTML.indexOf(encodeURI(leftBracket) to support old FF
    if (!~outerHTML.indexOf(leftBracket)) {
      continue;
    }

    // initialize bindings for attributes if they appear
    if (attributes.length) {
      // fixes Firefox issue: attributes.length can be changed by processAttribute
      const attrs = attributes.length > 1
        ? Array.prototype.slice.call(attributes)
        : attributes;

      forEach(attrs, (attribute) => {
        if (bindingReg.test(attribute.value)) {
          processAttribute({
            node,
            attribute,
            object,
            eventOptions: extendedEventOptions
          });
        }
      });
    }

    // if innerHTML does't contain left bracket,
    // then children of this node don't need to be parsed
    // we may need to add !~innerHTML.indexOf(encodeURI(leftBracket) to support old FF
    if (!~innerHTML.indexOf(leftBracket)) {
      continue;
    }

    for (let j = 0; j < childNodes.length; j++) {
      const childNode = childNodes[j];
      const { nodeType, textContent } = childNode;

      if (nodeType === ELEMENT_NODE) {
        // if childNode is HTML element then add it to the end of allNodes array
        // to check everything on next outer cycle iterations
        allNodes.push(childNode);
      } else if (nodeType === TEXT_NODE) {
        // if childNode is text node which contains things like {{x}}
        // then initialize bindings for this node
        if (bindingReg.test(textContent)) {
          processTextNode({
            object,
            node,
            textNode: childNode,
            eventOptions: extendedEventOptions
          });
        }
      }
    }
  }

  return nodes;
}