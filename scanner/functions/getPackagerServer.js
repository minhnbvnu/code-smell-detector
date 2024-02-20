function getPackagerServer(args, config) {
  let transformerPath = args.transformer;
  if (!isAbsolutePath(transformerPath)) {
    transformerPath = path.resolve(process.cwd(), transformerPath);
  }

  return ReactPackager.createServer({
    nonPersistent: args.nonPersistent,
    projectRoots: args.projectRoots,
    blacklistRE: config.getBlacklistRE(),
    cacheVersion: '3',
    getTransformOptionsModulePath: config.getTransformOptionsModulePath,
    transformModulePath: transformerPath,
    assetRoots: args.assetRoots,
    assetExts: [
      'bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'svg', 'webp', // Image formats
      'm4v', 'mov', 'mp4', 'mpeg', 'mpg', 'webm', // Video formats
      'aac', 'aiff', 'caf', 'm4a', 'mp3', 'wav', // Audio formats
      'html', 'pdf', // Document formats
    ],
    resetCache: args.resetCache || args['reset-cache'],
    verbose: args.verbose,
  });
}