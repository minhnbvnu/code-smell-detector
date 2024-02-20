async function transformDotnetCodeUri(baseDir, serviceName, functionName, functionRes) {
  const { CodeUri: codeUri, Handler: handler, Runtime: runtime } = functionRes.Properties;
  const handlerPaths = handler.split('::');
  if (handlerPaths.length !== 3) {
    throw new Error(red(`handler ${handler} is invalid`));
  }
  const assemblyFileName = `${handlerPaths[0]}.dll`;
  const assemblyFilePath = path.resolve(baseDir, codeUri, assemblyFileName);

  if (await fs.pathExists(assemblyFilePath)) {
    return;
  }

  const artifactDir = path.resolve(codeUri, 'bin', 'Debug', runtime);
  const absCodeUri = path.resolve(baseDir, codeUri);

  const builder = new fcBuilders.Builder(serviceName, functionName, absCodeUri, runtime, artifactDir, false, ['local']);
  await builder.build();
  functionRes.Properties.CodeUri = artifactDir;
}