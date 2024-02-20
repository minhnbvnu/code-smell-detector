function writeConfigFile(paths) {
  var locals = { modules: 'cjs', jsPath: paths.jsRelative };
  fs.writeTemplate('create', 'ember.json', locals, paths.app+'/ember.json');
}