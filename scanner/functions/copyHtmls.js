function copyHtmls() {
  var vfs = require('vinyl-fs');
  var through = require('through2');
  vfs.src(['./**/*.html', '!./_site/**/*.html', '!./spm_modules/**/*.html', '!./node_modules/**/*.html'])
    .pipe(through.obj(function(f, enc, cb) {
      f.contents = new Buffer(require('./utils/deps').replaceDeps(f.contents, f.relative));
      this.push(f);
      cb();
    }))
    .pipe(vfs.dest('./_site/'));
}