function _replaceFile (editor) {
  _getReplaceSupplementaryFileTool(editor).click()
  _getReplaceSupplementaryFileTool(editor).onFileSelect(new PseudoFileEvent())
}