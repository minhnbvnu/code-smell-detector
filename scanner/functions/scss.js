function scss(config) {
  return through.obj(function (file, enc, cb) {
    if (fileHelpers.isScss(file)) {
      sass.render(
        {
          file: file.path,
          functions: {
            'font-path($filename: 0)': function (filename) {
              var f = filename.getValue();
              var fontsFolder = config.fonts.destination;
              var cssFile = path.join(
                config.stylesheets.destination,
                file.relative
              );
              var relativeFolders = path.relative(
                path.dirname(cssFile),
                fontsFolder
              );
              return new sass.types.String(
                "url('" + path.join(relativeFolders, f) + "')"
              );
            },
          },
        },
        function (err, result) {
          if (err) console.log('Error parsing SCSS', err);
          file.contents = result.css;
          file.path = gutil.replaceExtension(file.path, '.css');

          debug('Finished');

          cb(err, file);
        }
      );
    } else {
      debug('Skipped');

      cb(null, file);
    }
  });
}