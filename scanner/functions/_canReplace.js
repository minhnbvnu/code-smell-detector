function _canReplace (editor) {
  return isToolEnabled(editor, 'context-tools', replaceSupplementaryFileToolSelector)
}