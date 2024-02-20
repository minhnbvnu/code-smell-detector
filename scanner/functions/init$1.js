function init$1(config, vm) {
  var isAuto = config.paths === 'auto';
  var isExpired = localStorage.getItem('docsify.search.expires') < Date.now();

  INDEXS = JSON.parse(localStorage.getItem('docsify.search.index'));

  if (isExpired) {
    INDEXS = {};
  } else if (!isAuto) {
    return
  }

  var paths = isAuto ? getAllPaths(vm.router) : config.paths;
  var len = paths.length;
  var count = 0;

  paths.forEach(function (path) {
    if (INDEXS[path]) {
      return count++
    }

    Docsify
      .get(vm.router.getFile(path), false, vm.config.requestHeaders)
      .then(function (result) {
        INDEXS[path] = genIndex(path, result, vm.router, config.depth);
        len === ++count && saveData(config.maxAge);
      });
  });
}