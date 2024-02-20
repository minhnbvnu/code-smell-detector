function getVNodeHelper(ssr, isComponent) {
    return ssr || isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
  }