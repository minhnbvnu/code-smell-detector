function writeResourceIdFilter(node, filter, objectStack) {
  node.setAttribute('rid', /** @type {string} */ (filter.rid));
}