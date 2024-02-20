function renderFile(file, context) {
  const renderedFile = renderContent(file, context);
  const fullSourceFile = path.resolve(context.repoDir, file);
  const fullTargetFile = path.resolve(context.outputDir, renderedFile);
  debug('Source file: %s, target file: %s', fullSourceFile, fullTargetFile);

  if (isIgnorePaths(fullSourceFile, context)) {
    return;
  }

  console.log(green(`+ ${ fullTargetFile }`));

  const stat = fs.statSync(fullSourceFile);

  if (isCopyOnlyPath(fullSourceFile, context)) {
    debug('Copy %s to %s', fullSourceFile, fullTargetFile);

    fs.createReadStream(fullSourceFile)
      .pipe(fs.createWriteStream(fullTargetFile))
      .on('finish', () => { fs.chmodSync(fullTargetFile, stat.mode); });

    return;
  }

  if (needMerge(renderedFile, context)) {
    merge(fullSourceFile, fullTargetFile, context);
    return;
  }

  const content = fs.readFileSync(fullSourceFile, 'utf8');
  const renderedContent = renderContent(content, context);
  fs.writeFileSync(fullTargetFile, renderedContent);
  fs.chmodSync(fullTargetFile, stat.mode);
}