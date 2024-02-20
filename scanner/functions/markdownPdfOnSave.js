function markdownPdfOnSave() {
  try {
    var editor = vscode.window.activeTextEditor;
    var mode = editor.document.languageId;
    if (mode != 'markdown') {
      return;
    }
    if (!isMarkdownPdfOnSaveExclude()) {
      markdownPdf('settings');
    }
  } catch (error) {
    showErrorMessage('markdownPdfOnSave()', error);
  }
}