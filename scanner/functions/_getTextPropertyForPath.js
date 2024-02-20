function _getTextPropertyForPath (editor, path) {
  if (isString(path)) {
    path = path.split('.')
  }
  let property = editor.find(`.sc-surface .sc-text-property[data-path="${getKeyForPath(path)}"]`)
  if (!property) {
    throw new Error('Could not find text property for path ' + path)
  }
  return property
}