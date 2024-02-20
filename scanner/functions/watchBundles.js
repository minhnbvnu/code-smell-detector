function watchBundles () {
  var bundleKeys = Object.keys(bundles);
  var watch = null;
  var key = null;
  for (var b = 0; b < bundleKeys.length; b++) {
    key = bundleKeys[b];
    watch = watchify(bundles[key].bundle);
    watch.on('update', buildBundle.bind(this, key));
  }
}