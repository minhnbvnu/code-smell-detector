function getBinaryPath(binaryName) {
  if (isWindows) {
    binaryName += '.cmd';
  }

  const jsdocResolved = path.join(
    baseDir,
    '..',
    'node_modules',
    'jsdoc',
    'jsdoc.js',
  );
  const expectedPaths = [
    path.join(baseDir, '..', 'node_modules', '.bin', binaryName),
    path.resolve(
      path.join(path.dirname(jsdocResolved), '..', '.bin', binaryName),
    ),
  ];

  for (let i = 0; i < expectedPaths.length; i++) {
    const expectedPath = expectedPaths[i];
    if (fse.existsSync(expectedPath)) {
      return expectedPath;
    }
  }

  throw Error(
    'JsDoc binary was not found in any of the expected paths: ' + expectedPaths,
  );
}