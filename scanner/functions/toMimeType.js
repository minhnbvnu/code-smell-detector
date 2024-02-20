function toMimeType(fileType) {
  if (fileType[0] === '.') {
    return mimeTypes[fileType.slice(1)];
  }

  return fileType;
}