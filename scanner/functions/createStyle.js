function createStyle (oldVnode, vnode) {
  setStaticStyles(oldVnode, vnode);

  // to data binding style
  updateStyle(oldVnode, vnode);
}