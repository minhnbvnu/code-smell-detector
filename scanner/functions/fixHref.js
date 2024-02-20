function fixHref(resource, href) {
  try {
    if (!href) {
      return href;
    }

    // Use href if it is already an URL
    const hrefUri = vscode.Uri.parse(href);
    if (['http', 'https'].indexOf(hrefUri.scheme) >= 0) {
      return hrefUri.toString();
    }

    // Use a home directory relative path If it starts with ^.
    if (href.indexOf('~') === 0) {
      return vscode.Uri.file(href.replace(/^~/, os.homedir())).toString();
    }

    // Use href as file URI if it is absolute
    if (path.isAbsolute(href)) {
      return vscode.Uri.file(href).toString();
    }

    // Use a workspace relative path if there is a workspace and markdown-pdf.stylesRelativePathFile is false
    var stylesRelativePathFile = vscode.workspace.getConfiguration('markdown-pdf')['stylesRelativePathFile'];
    let root = vscode.workspace.getWorkspaceFolder(resource);
    if (stylesRelativePathFile === false && root) {
      return vscode.Uri.file(path.join(root.uri.fsPath, href)).toString();
    }

    // Otherwise look relative to the markdown file
    return vscode.Uri.file(path.join(path.dirname(resource.fsPath), href)).toString();
  } catch (error) {
    showErrorMessage('fixHref()', error);
  }
}