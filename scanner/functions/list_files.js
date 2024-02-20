function list_files(input){
  return dir.promiseFiles(input)
    .then(files => {
      files = files.filter(file => {
        return file.indexOf('node_modules') === -1 && (['js', 'jsx', 'ts', 'tsx', 'html', 'htm'].includes(extension(file)) || file.toLowerCase().indexOf('package.json') > -1 || file.toLowerCase().indexOf('package-lock.json') > -1 || file.toLowerCase().indexOf('yarn.lock') > -1);
      });
      return files;
    })
    .catch(console.error);
}