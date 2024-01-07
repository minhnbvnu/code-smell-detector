function createDataNode(root, container, expr) {
  const parsed = parseExpression(expr);

  if (!parsed) {
    return null;
  }

  if (parsed.some(x => x.operator === operators.dotDot)) {
    return null;
  }

  const fn = shortcuts.get(parsed[0].name);
  let i = 0;

  if (fn) {
    root = fn(root, container);
    i = 1;
  } else {
    root = container || root;
  }

  for (let ii = parsed.length; i < ii; i++) {
    const {
      cacheName,
      index
    } = parsed[i];

    if (!isFinite(index)) {
      parsed[i].index = 0;
      return createNodes(root, parsed.slice(i));
    }

    const cached = somCache.get(root);

    if (!cached) {
      (0, _util.warn)(`XFA - createDataNode must be called after searchNode.`);
      return null;
    }

    const children = cached.get(cacheName);

    if (children.length === 0) {
      return createNodes(root, parsed.slice(i));
    }

    if (index < children.length) {
      const child = children[index];

      if (!(child instanceof _xfa_object.XFAObject)) {
        (0, _util.warn)(`XFA - Cannot create a node.`);
        return null;
      }

      root = child;
    } else {
      parsed[i].index = children.length - index;
      return createNodes(root, parsed.slice(i));
    }
  }

  return null;
}