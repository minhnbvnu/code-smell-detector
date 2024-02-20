function getOutputDir(filename, resource) {
  try {
    var outputDir;
    if (resource === undefined) {
      return filename;
    }
    var outputDirectory = vscode.workspace.getConfiguration('markdown-pdf')['outputDirectory'] || '';
    if (outputDirectory.length === 0) {
      return filename;
    }

    // Use a home directory relative path If it starts with ~.
    if (outputDirectory.indexOf('~') === 0) {
      outputDir = outputDirectory.replace(/^~/, os.homedir());
      mkdir(outputDir);
      return path.join(outputDir, path.basename(filename));
    }

    // Use path if it is absolute
    if (path.isAbsolute(outputDirectory)) {
      if (!isExistsDir(outputDirectory)) {
        showErrorMessage(`The output directory specified by the markdown-pdf.outputDirectory option does not exist.\
          Check the markdown-pdf.outputDirectory option. ` + outputDirectory);
        return;
      }
      return path.join(outputDirectory, path.basename(filename));
    }

    // Use a workspace relative path if there is a workspace and markdown-pdf.outputDirectoryRootPath = workspace
    var outputDirectoryRelativePathFile = vscode.workspace.getConfiguration('markdown-pdf')['outputDirectoryRelativePathFile'];
    let root = vscode.workspace.getWorkspaceFolder(resource);
    if (outputDirectoryRelativePathFile === false && root) {
      outputDir = path.join(root.uri.fsPath, outputDirectory);
      mkdir(outputDir);
      return path.join(outputDir, path.basename(filename));
    }

    // Otherwise look relative to the markdown file
    outputDir = path.join(path.dirname(resource.fsPath), outputDirectory);
    mkdir(outputDir);
    return path.join(outputDir, path.basename(filename));
  } catch (error) {
    showErrorMessage('getOutputDir()', error);
  }
}