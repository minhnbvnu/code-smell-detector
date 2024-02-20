function toConsole(source, file, argv) {
  var config = getConfig(file, argv);
  if (!source || !config) return;
  try {
    var result;

    if (argv.diff || argv['diff-unified']) {
      var method = argv.diff ? 'chars' : 'unified';
      if (!supportsColor) {
        method = 'unifiedNoColor';
      }
      result = esformatter.diff[method](source, config, file);
      if (result) {
        exports.exitCode = 1;
        // we are using stdout even tho it's considered an "error" because user
        // might want to pipe multiple tools and diff(1) also outputs to stdout
        exports.stdout.write(result);
      }
      return;
    }

    result = esformatter.format(source, config);
    // do not use console.log since it adds a line break at the end
    exports.stdout.write(result);

  } catch (e) {
    logError({
      stack: e.stack,
      message: e.message,
      file: (file || 'stdin')
    });
  }
}