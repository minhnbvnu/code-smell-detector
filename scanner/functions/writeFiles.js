function writeFiles(paths) {
  [
    'config/app.js',
    'config/store.js',
    'config/routes.js',
    'templates/application.hbs',
    'templates/index.hbs'
  ].forEach(function(file) {
    var savePath = paths.js+'/'+file;
    fs.writeTemplate('create', file, {}, savePath);
  });
  var locals = {jsPath: paths.jsRelative};
  fs.writeTemplate('create', 'index.html', locals, paths.app+'/index.html');
}