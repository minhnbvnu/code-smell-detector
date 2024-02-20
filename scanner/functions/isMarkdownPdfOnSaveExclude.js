function isMarkdownPdfOnSaveExclude() {
  try{
    var editor = vscode.window.activeTextEditor;
    var filename = path.basename(editor.document.fileName);
    var patterns = vscode.workspace.getConfiguration('markdown-pdf')['convertOnSaveExclude'] || '';
    var pattern;
    var i;
    if (patterns && Array.isArray(patterns) && patterns.length > 0) {
      for (i = 0; i < patterns.length; i++) {
        pattern = patterns[i];
        var re = new RegExp(pattern);
        if (re.test(filename)) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    showErrorMessage('isMarkdownPdfOnSaveExclude()', error);
  }
}