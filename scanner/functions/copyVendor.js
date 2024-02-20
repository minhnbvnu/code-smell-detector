function copyVendor(paths) {
  var src = __dirname+'/../../packages';
  var dest = paths.js+'/vendor';
  fs.readdirSync(src).forEach(function(filePath) {
    var file = fs.readFileSync(src+'/'+filePath).toString();
    fs.writeFileSync(dest+'/'+filePath, file);
  });
}