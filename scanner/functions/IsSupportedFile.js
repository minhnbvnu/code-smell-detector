function IsSupportedFile(fileName) {
  const fileExt = path.extname(fileName);
  return SupportedExtensions().includes(fileExt);
}