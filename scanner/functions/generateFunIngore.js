async function generateFunIngore(baseDir, codeUri, runtime) {
  const absCodeUri = path.resolve(baseDir, codeUri);
  const absBaseDir = path.resolve(baseDir);

  const relative = path.relative(absBaseDir, absCodeUri);

  if (codeUri.startsWith('..') || relative.startsWith('..')) {
    console.warn(red(`\t\twarning: funignore is not supported for your CodeUri: ${codeUri}`));
    return null;
  }

  return await funignore(baseDir, runtime);
}