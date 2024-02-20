async function detectLibraryFolders(dirName, libraryFolders, wrap, functionName) {
  if (_.isEmpty(libraryFolders)) { return; }

  for (const libraryFolder of libraryFolders) {
    const libraryPath = path.join(dirName, libraryFolder);
    if (await fs.pathExists(libraryPath)) {
      console.warn(red(`${wrap}Fun detected that the library directory '${libraryFolder}' is not included in function '${functionName}' CodeUri.\n\t\tPlease make sure if it is the right configuration. if yes, ignore please.`));
      return;
    }
  }
}