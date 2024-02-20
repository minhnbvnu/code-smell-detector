function matchImageSnapshotPlugin({ path: screenshotPath }) {
  if (!snapshotRunning) {
    return null;
  }

  const {
    screenshotsFolder,
    updateSnapshots,
    options: {
      failureThreshold = 0,
      failureThresholdType = 'pixel',
      customSnapshotsDir,
      customDiffDir,
      ...options
    } = {},
  } = snapshotOptions;

  const receivedImageBuffer = fs.readFileSync(screenshotPath);
  fs.removeSync(screenshotPath);

  const { dir: screenshotDir, name } = path.parse(
    screenshotPath
  );

  // remove the cypress v5+ native retries suffix from the file name
  const snapshotIdentifier = name.replace(/ \(attempt [0-9]+\)/, '');

  const relativePath = path.relative(screenshotsFolder, screenshotDir);
  const snapshotsDir = customSnapshotsDir
    ? path.join(process.cwd(), customSnapshotsDir, relativePath)
    : path.join(screenshotsFolder, '..', 'snapshots', relativePath);

  const snapshotKebabPath = path.join(
    snapshotsDir,
    `${snapshotIdentifier}${kebabSnap}`
  );
  const snapshotDotPath = path.join(
    snapshotsDir,
    `${snapshotIdentifier}${dotSnap}`
  );

  const diffDir = customDiffDir
    ? path.join(process.cwd(), customDiffDir, relativePath)
    : path.join(snapshotsDir, '__diff_output__');
  const diffDotPath = path.join(diffDir, `${snapshotIdentifier}${dotDiff}`);

  if (fs.pathExistsSync(snapshotDotPath)) {
    fs.copySync(snapshotDotPath, snapshotKebabPath);
  }

  snapshotResult = diffImageToSnapshot({
    snapshotsDir,
    diffDir,
    receivedImageBuffer,
    snapshotIdentifier,
    failureThreshold,
    failureThresholdType,
    updateSnapshot: updateSnapshots,
    ...options,
  });

  const { pass, added, updated, diffOutputPath } = snapshotResult;

  if (!pass && !added && !updated) {
    fs.copySync(diffOutputPath, diffDotPath);
    fs.removeSync(diffOutputPath);
    fs.removeSync(snapshotKebabPath);
    snapshotResult.diffOutputPath = diffDotPath;

    return {
      path: diffDotPath,
    };
  }

  fs.copySync(snapshotKebabPath, snapshotDotPath);
  fs.removeSync(snapshotKebabPath);
  snapshotResult.diffOutputPath = snapshotDotPath;

  return {
    path: snapshotDotPath,
  };
}