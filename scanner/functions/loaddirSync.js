function loaddirSync(path) {
 return fs.readdirSync(path).filter(function (filename) {
   return fs.statSync(filename).isFile();
 }).map(function (filename) {
   return fs.readFileSync(filename);
 });
}