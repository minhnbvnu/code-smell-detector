async function markdownPdf(option_type) {

  try {

    // check active window
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active Editor!');
      return;
    }

    // check markdown mode
    var mode = editor.document.languageId;
    if (mode != 'markdown') {
      vscode.window.showWarningMessage('It is not a markdown mode!');
      return;
    }

    var uri = editor.document.uri;
    var mdfilename = uri.fsPath;
    var ext = path.extname(mdfilename);
    if (!isExistsPath(mdfilename)) {
      if (editor.document.isUntitled) {
        vscode.window.showWarningMessage('Please save the file!');
        return;
      }
      vscode.window.showWarningMessage('File name does not get!');
      return;
    }

    var types_format = ['html', 'pdf', 'png', 'jpeg'];
    var filename = '';
    var types = [];
    if (types_format.indexOf(option_type) >= 0) {
      types[0] = option_type;
    } else if (option_type === 'settings') {
      var types_tmp = vscode.workspace.getConfiguration('markdown-pdf')['type'] || 'pdf';
      if (types_tmp && !Array.isArray(types_tmp)) {
          types[0] = types_tmp;
      } else {
        types = vscode.workspace.getConfiguration('markdown-pdf')['type'] || 'pdf';
      }
    } else if (option_type === 'all') {
      types = types_format;
    } else {
      showErrorMessage('markdownPdf().1 Supported formats: html, pdf, png, jpeg.');
      return;
    }

    // convert and export markdown to pdf, html, png, jpeg
    if (types && Array.isArray(types) && types.length > 0) {
      for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (types_format.indexOf(type) >= 0) {
          filename = mdfilename.replace(ext, '.' + type);
          var text = editor.document.getText();
          var content = convertMarkdownToHtml(mdfilename, type, text);
          var html = makeHtml(content, uri);
          await exportPdf(html, filename, type, uri);
        } else {
          showErrorMessage('markdownPdf().2 Supported formats: html, pdf, png, jpeg.');
          return;
        }
      }
    } else {
      showErrorMessage('markdownPdf().3 Supported formats: html, pdf, png, jpeg.');
      return;
    }
  } catch (error) {
    showErrorMessage('markdownPdf()', error);
  }
}