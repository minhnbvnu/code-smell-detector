function checkResult(fileBuffer, filePath, fileSize, outputDir) {
  if (!Buffer.isBuffer(fileBuffer) || typeof filePath !== 'string') return;

  const fileExt = path.extname(filePath).toLowerCase();
  const before = formatBytes(fileSize.before);
  const after = formatBytes(fileSize.after);
  const ratio = calcRatio(fileSize.before, fileSize.after);
  const successMessage = `${before} → ${after}. Ratio: ${ratio}%`;

  const writeFilePath = prepareWriteFilePath(filePath, outputDir);

  const isChanged = !fs.readFileSync(filePath).equals(fileBuffer);
  const isOptimized = ratio > 0;
  const isSvg = fileExt === '.svg';

  if (isOptimized || (isChanged && isSvg)) {
    try {
      fs.writeFileSync(writeFilePath, fileBuffer);

      log(filePath, {
        type: !isOptimized ? 'warning' : 'success',
        description: successMessage,
      });
    } catch (error) {
      if (error.message) {
        log(filePath, {
          type: 'error',
          description: error.message,
        });
      } else {
        console.error(error);
      }
    }
  } else {
    log(filePath, {
      description: `${(isChanged ? 'File size increased' : 'Nothing changed')}. Skipped`,
      verboseOnly: true,
    });
  }
}