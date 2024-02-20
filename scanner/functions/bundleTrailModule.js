function bundleTrailModule(name) {
  if (!fs.existsSync('./splittable-build')) {
    fs.mkdirSync('./splittable-build');
  }
  var tmp = require('tmp').fileSync({
    template: './splittable-build/tmp-XXXXXX.js'
  });

  var js = '// Generated code to get module ' + name + '\n' +
      '(self["_S"]=self["_S"]||[])["//' + name + '"]=' +
      'require("' + relativePath(path.dirname(tmp.name), name) + '")\n';
  fs.writeFileSync(tmp.name, js, 'utf8');
  return relativePath(process.cwd(), tmp.name);
}