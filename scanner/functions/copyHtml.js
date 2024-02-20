function copyHtml(file) {
  log.info('copy html', file);
  var vfs = require('vinyl-fs');
  var through = require('through2');
  vfs.src(file)
    .pipe(through.obj(function(f, enc, cb) {
      f.contents = new Buffer(require('./utils/deps').replaceDeps(f.contents, file));
      cb(null, f);
    }))
    .pipe(vfs.dest('./_site/'));
}