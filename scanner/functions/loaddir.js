function loaddir(path) { return function (callback, errback) {
  fs.readdir(path)(function (filenames) {
    Do.filterMap(filenames, loadFile)(callback, errback);
  }, errback);
}}