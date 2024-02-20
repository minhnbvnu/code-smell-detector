function getVNodeBlockHelper(ssr, isComponent) {
    return ssr || isComponent ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
  }