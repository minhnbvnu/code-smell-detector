function _openFindAndReplaceDialog (editor, replace) {
  // open findAndReplace dialog
  let fnrManager = editor.context.findAndReplaceManager
  fnrManager.openDialog(replace)
  let fnrDialog = editor.find('.sc-find-and-replace-dialog')
  return { fnrManager, fnrDialog }
}