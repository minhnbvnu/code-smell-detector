function is_directory(input){
  return fs.statSync(input).isDirectory();
}