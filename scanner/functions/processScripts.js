function processScripts(sources, filename){
  sources.pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.angularFilesort()))
    .pipe($.if('*.js', $.replace('<<adfVersion>>', pkg.version)))
    .pipe($.if('*.js', $.replace(/'use strict';/g, '')))
    .pipe($.concat(filename + '.js'))
    .pipe($.headerfooter('(function(window, undefined) {\'use strict\';\n', '\n})(window);'))
    .pipe($.ngAnnotate(annotateOptions))
    .pipe(gulp.dest('dist/'))
    .pipe($.rename(filename + '.min.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
}