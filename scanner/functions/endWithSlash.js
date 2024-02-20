function endWithSlash(inputPath) {
  if (inputPath.length === 0) {
    throw new Error(red('Local path could not be Empty'));
  }
  return inputPath.charAt(inputPath.length - 1) === '/';
}