function src(glob, opt) {
  var optResolver = createResolver(config, opt);

  if (!isValidGlob(glob)) {
    throw new Error('Invalid glob argument: ' + glob);
  }

  if (!Array.isArray(glob)) {
    glob = [glob];
  }

  glob = glob.map(normalize);

  var outputStream = pipeline(
    gs(glob, opt),
    wrapVinyl(optResolver),
    resolveSymlinks(optResolver),
    prepare(optResolver),
    readContents(optResolver),
    sourcemap(optResolver)
  );

  return toThrough(outputStream);
}