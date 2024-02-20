function resolveOutputDir(cwd, outputDir) {
  if (!path.isAbsolute(outputDir)) {
    if (!cwd || cwd === '.') {
      cwd = process.cwd();
    }
    cwd = path.resolve(cwd);
    return path.resolve(cwd, outputDir);
  }
  return outputDir;
}