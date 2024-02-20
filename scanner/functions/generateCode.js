function generateCode(cwd, pkg) {
  var files = require('glob').sync('**/*.*(md|htm|html)', {
    ignore: ['_site/**', 'spm_modules/**', 'node_modules/**'],
    cwd: cwd
  });

  var deps = getDeps(files);
  log.info('deps', deps.join(', '));
  var main = pkg.oldMain || 'index';
  main = main.replace(/^\.\//, '');

  var code = [];
  if (exists(join(cwd, main)) || exists(join(cwd, main + '.js'))) {
    code = ['module.exports = require(\'../' + main + '\')'];
  }

  deps.forEach(function(dep) {
    if (dep === pkg.name) return;
    var rDep = dep;
    if (isRelative(rDep)) {
      rDep = path.relative('./_site/', rDep);
      if (rDep.charAt(0) !== '.') {
        rDep = './' + rDep;
      }
    }
    code.push('window[\''+dep+'\'] = require(\''+rDep+'\');');
  });

  return code.join('\n');
}