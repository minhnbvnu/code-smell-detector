function searchNode(root, container, expr, dotDotAllowed = true, useCache = true) {
  const parsed = parseExpression(expr, dotDotAllowed);

  if (!parsed) {
    return null;
  }

  const fn = shortcuts.get(parsed[0].name);
  let i = 0;
  let isQualified;

  if (fn) {
    isQualified = true;
    root = [fn(root, container)];
    i = 1;
  } else {
    isQualified = container === null;
    root = [container || root];
  }

  for (let ii = parsed.length; i < ii; i++) {
    const {
      name,
      cacheName,
      operator,
      index
    } = parsed[i];
    const nodes = [];

    for (const node of root) {
      if (!(node instanceof _xfa_object.XFAObject)) {
        continue;
      }

      let children, cached;

      if (useCache) {
        cached = somCache.get(node);

        if (!cached) {
          cached = new Map();
          somCache.set(node, cached);
        }

        children = cached.get(cacheName);
      }

      if (!children) {
        switch (operator) {
          case operators.dot:
            children = node[_xfa_object.$getChildrenByName](name, false);
            break;

          case operators.dotDot:
            children = node[_xfa_object.$getChildrenByName](name, true);
            break;

          case operators.dotHash:
            children = node[_xfa_object.$getChildrenByClass](name);

            if (children instanceof _xfa_object.XFAObjectArray) {
              children = children.children;
            } else {
              children = [children];
            }

            break;

          default:
            break;
        }

        if (useCache) {
          cached.set(cacheName, children);
        }
      }

      if (children.length > 0) {
        nodes.push(children);
      }
    }

    if (nodes.length === 0 && !isQualified && i === 0) {
      const parent = container[_xfa_object.$getParent]();

      container = parent;

      if (!container) {
        return null;
      }

      i = -1;
      root = [container];
      continue;
    }

    if (isFinite(index)) {
      root = nodes.filter(node => index < node.length).map(node => node[index]);
    } else {
      root = nodes.reduce((acc, node) => acc.concat(node), []);
    }
  }

  if (root.length === 0) {
    return null;
  }

  return root;
}