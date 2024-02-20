function compileAttributes(context, node, includeBasicValues = false) {
  const attributes = node.attributes;

  for (let i = 0, ii = attributes.length; i < ii; ++i) {
    const attr = attributes[i];
    const attrValue = attr.value;
    const parseResult = parseContent(context, attrValue);
    let result = null;

    if (parseResult === null) {
      if (includeBasicValues) {
        result = new HTMLBindingDirective(() => attrValue);
        result.targetName = attr.name;
      }
    } else {
      result = createAggregateBinding(parseResult);
    }

    if (result !== null) {
      node.removeAttributeNode(attr);
      i--;
      ii--;
      context.addFactory(result);
    }
  }
}