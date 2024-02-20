async function detectLibrary(codeUri, runtime, baseDir, functionName, wrap = '') {
  if (codeUri) {
    const absoluteCodePath = path.resolve(baseDir, codeUri);

    const stats = await fs.lstat(absoluteCodePath);
    if (stats.isFile()) {
      let libraryFolders = runtimeTypeMapping[runtime];

      await detectLibraryFolders(path.dirname(absoluteCodePath), libraryFolders, wrap, functionName);
    }
  }
}