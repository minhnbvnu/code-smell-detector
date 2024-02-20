function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}