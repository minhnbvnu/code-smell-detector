function _Folder(path) {
  addGetter(this, 'exists', function() {
    var exists = false;
    try {
      exists = fs.statSync(path).isDirectory();
    } catch(e) {}
    return exists;
  });

  this.create = function() {
    // stub
  };
}