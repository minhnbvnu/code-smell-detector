function toRelativePath(pathToFile, pathToParent){
  return pathToFile.replace(`${pathToParent}${path.sep}`, '');
}