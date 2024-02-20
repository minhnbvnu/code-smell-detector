function checkDir(dir) {
  fs.readdirSync(dir).forEach(function(file) {
    var fname = dir + "/" + file;
    if (/\.js$/.test(file)) checkFile(fname);
    else if (file != "dep" && fs.lstatSync(fname).isDirectory()) checkDir(fname);
  });
}