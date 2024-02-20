function processImage({ filePath, convertFunction, lossless, outputFormat, force, progressBar, tasksErrors, outputDir, config }) {
  const writeFilePath = prepareWriteFilePath(getOutputFilePath(filePath, outputFormat), outputDir);

  return fs.promises.readFile(filePath)
    .then(fileBuffer => {
      if (!force && fs.existsSync(writeFilePath)) {
        throw new Error(`File already exists, '${writeFilePath}'`);
      }

      return convertFunction({
        fileBuffer,
        fileExt: path.extname(filePath).toLowerCase(),
        lossless,
        config,
      });
    })
    .then(fileBuffer => {
      progressBar.increment();
      return { fileBuffer, filePath, outputFormat };
    })
    .catch(error => {
      progressBar.increment();
      tasksErrors.push([filePath, {
        type: 'error',
        description: (error.message || '').trim(),
      }]);
    });
}