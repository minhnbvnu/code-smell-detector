function _openWorkflow (editor) {
  // open the add drop down and find tool
  const tool = _getInsertSupplementaryFileTool(editor)
  tool.click()
  let workflow = editor.find('.se-workflow-modal')
  return workflow
}