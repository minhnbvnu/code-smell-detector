function createBundler(useWatchify) {
  return browserify({
    entries:      [ "./site.js" ],
    transform:    [ [babelify, {}], [envify, {}] ],
    plugin:       isProd || !useWatchify ? [] : [ lrload ],    // no additional configuration is needed
    debug:        !isProd,
    cache:        {},
    packageCache: {},
    fullPaths:    !isProd                       // for watchify
  })
}