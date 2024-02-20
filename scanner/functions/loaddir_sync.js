function loaddir_sync(path) {
 return posix_sync.readdir(path).filter(function (filename) {
   return posix_sync.stat(filename).isFile();
 }).map(function (filename) {
   return [filename, posix_sync.cat(filename)];
 });
}