function transformPathForVirtualBox(source) {
  // C:\\Users\\image_crawler\\code -> /c/Users/image_crawler/code
  const sourcePath = source.split(':').join('');
  const lowerFirstAndReplace = _.lowerFirst(sourcePath.split('\\').join('/'));
  return '/' + lowerFirstAndReplace;
}