function symlink(outFolder, opt) {
  if (!outFolder) {
    throw new Error(
      'Invalid symlink() folder argument.' +
        ' Please specify a non-empty string or a function.'
    );
  }

  var optResolver = createResolver(config, opt);
  var folderResolver = createResolver(folderConfig, { outFolder: outFolder });

  function dirpath(file, callback) {
    var dirMode = optResolver.resolve('dirMode', file);

    callback(null, file.dirname, dirMode);
  }

  var stream = composer.pipeline(
    prepare(folderResolver, optResolver),
    mkdirpStream(dirpath),
    linkFile(optResolver)
  );

  // Sink the stream to start flowing
  return lead(stream);
}