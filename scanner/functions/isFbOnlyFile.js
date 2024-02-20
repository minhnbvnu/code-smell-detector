function isFbOnlyFile(filePath) {
  return (
    filePath
      .split(path.sep)
      .find(part => part.startsWith('fb-') || part === 'fb') != null
  );
}