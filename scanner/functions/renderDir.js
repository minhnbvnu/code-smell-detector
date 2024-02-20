function renderDir(dir, context) {
  const renderedDir = renderContent(dir, context);
  const fullSourceDir = path.resolve(context.repoDir, dir);
  const fullTargetDir = path.resolve(context.outputDir, renderedDir);

  if (isIgnorePaths(fullSourceDir, context)) {
    return;
  }

  const stat = fs.statSync(fullSourceDir);

  debug('Source Dir: %s, target dir: %s', fullSourceDir, fullTargetDir);
  console.log(green(`+ ${ fullTargetDir }`));
  if (!fs.existsSync(fullTargetDir)) {
    fs.mkdirSync(fullTargetDir);
    fs.chmodSync(fullTargetDir, stat.mode);

  }
  const files = fs.readdirSync(fullSourceDir);
  files.forEach(file => {
    const targetFile = path.join(dir, file);
    const fullTargetFile = path.resolve(fullSourceDir, file);
    var stat = fs.statSync(fullTargetFile);
    if (stat && stat.isDirectory()) {
      renderDir(targetFile, context);
    } else {
      renderFile(targetFile, context);
    }
  });
}