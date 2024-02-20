function internalNodeToJson(node, options) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  if (isNil(node) || node === false) {
    return '';
  }

  const json = applyMap(
    {
      node,
      type: extractTypeName(node),
      props: getProps(node, options),
      children: getChildren(node, options),
      $$typeof: Symbol.for('react.test.json'),
    },
    options,
  );

  if (!isNil(json) && !isNil(json.type)) {
    return json;
  }
}