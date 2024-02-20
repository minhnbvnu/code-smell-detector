function buildComponentFromVNode(dom, vnode, context, mountAll) {
  var c = dom && dom._component,
      originalComponent = c,
      oldDom = dom,
      isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
      isOwner = isDirectOwner,
      props = getNodeProps(vnode);

  while (c && !isOwner && (c = c._parentComponent)) {
    isOwner = c.constructor === vnode.nodeName;
  }

  if (c && isOwner && (!mountAll || c._component)) {
    setComponentProps(c, props, 3, context, mountAll);
    dom = c.base;
  } else {
    if (originalComponent && !isDirectOwner) {
      unmountComponent(originalComponent);
      dom = oldDom = null;
    }

    c = createComponent(vnode.nodeName, props, context);

    if (dom && !c.nextBase) {
      c.nextBase = dom; // passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:

      oldDom = null;
    }

    setComponentProps(c, props, 1, context, mountAll);
    dom = c.base;

    if (oldDom && dom !== oldDom) {
      oldDom._component = null;
      recollectNodeTree(oldDom, false);
    }
  }

  return dom;
}