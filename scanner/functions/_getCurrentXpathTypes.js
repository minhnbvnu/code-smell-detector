function _getCurrentXpathTypes (editor) {
  const xpath = _getCurrentXpath(editor)
  return xpath.map(p => p.type)
}