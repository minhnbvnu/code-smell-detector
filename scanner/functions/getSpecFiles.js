function getSpecFiles(pkg) {
  var spec = pkg.spm.tests || 'tests/**/*-spec.js';
  var ret = glob.sync(path.join(process.cwd(), spec));
  return ret.map(function(item) {
    return './' + path.relative(process.cwd(), item);
  }).filter(function(item) {
    return item.indexOf('_site') < 0;
  });
}