function generateFile(cwd, pkg) {
  var code;

  chokidar.watch('**/*.(md|html)', {
    ignored: /(spm_modules|node_modules|_site)/
  }).on('change', function(filepath) {
    log.info('watch', filepath);
    g();
    if (path.extname(filepath) === '.html') {
      copyHtml(filepath);
    }
  });

  g();

  function g() {
    var newCode = generateCode(cwd, pkg);
    if (newCode === code) return;

    if (code) {
      log.info('deps changed');
    }
    if (!code) {
      mkdirp(join(cwd, '_site'));
    }
    writeFile(join(cwd, '_site/_bundle.js'), newCode);
    log.info('generate', '_site/_bundle.js');
    code = newCode;
  }
}