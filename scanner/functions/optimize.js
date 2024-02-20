async function optimize({ paths, lossless: isLossless, output: outputDir, config }) {
  const totalPaths = paths.length;

  if (!totalPaths) return;

  log(`Optimizing ${totalPaths} ${getPlural(totalPaths, 'image', 'images')} (${isLossless ? 'lossless' : 'lossy'})...`);
  if (isLossless) log('Lossless optimization may take a long time');

  const progressBar = new CliProgress.SingleBar({
    format: `{bar} {percentage}% | Processed {value} of {total} ${getPlural(totalPaths, 'image', 'images')}`,
    clearOnComplete: true,
    stopOnComplete: true,
  }, CliProgress.Presets.shades_classic);

  progressBar.start(totalPaths, 0);

  const limit = pLimit(
    /*
      Guetzli uses a large amount of memory and a significant amount of CPU time.
      To reduce the processor load in lossless mode, we reduce the number
      of simultaneous tasks by half.
     */
    isLossless ? Math.round(os.cpus().length / 2) : os.cpus().length,
  );

  const tasksErrors = [];

  const tasks = paths.map(filePath => limit(() => fs.promises.readFile(filePath)
    .then(fileBuffer => optimizeByType({
      fileBuffer,
      filePath,
      isLossless,
      config,
    })))
    .then(fileBuffer => {
      progressBar.increment();
      return { fileBuffer, filePath };
    })
    .catch(error => {
      progressBar.increment();
      tasksErrors.push([filePath, {
        type: 'error',
        description: (error.message || '').trim(),
      }]);
    }));

  const totalSize = { before: 0, after: 0 };
  const tasksResult = await Promise.all(tasks);

  tasksResult
    .filter(Boolean)
    .forEach(({ fileBuffer, filePath } = {}) => {
      const fileSize = {
        before: fs.statSync(filePath).size,
        after: fileBuffer.length,
      };
      const isOptimized = fileSize.before > fileSize.after;

      totalSize.before += fileSize.before;
      totalSize.after += isOptimized ? fileSize.after : fileSize.before;

      checkResult(fileBuffer, filePath, fileSize, outputDir);
    });

  tasksErrors.forEach(error => log(...error));

  console.log();
  showTotal(totalSize.before, totalSize.after);
}