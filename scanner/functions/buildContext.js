function buildContext(root) {
  const context = {
    plugin: 'vscode',
    editors: {},
  };

  vscode.window.visibleTextEditors.forEach(e => {
    const relativePath = path.relative(root(), e.document.fileName);
    writeValueAtPath(relativePath, {
      filename: e.document.fileName,
      filename_escaped: cleanPath(e.document.fileName),
      hash: md5(e.document.getText()),
      offset: e.document.offsetAt(e.selection.active),
    }, context.editors);
  });

  return context;
}