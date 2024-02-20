function getOutputFilePath(filePath, outputFormat) {
  const { dir, name } = path.parse(filePath);
  return path.join(dir, `${name}.${outputFormat.toLowerCase()}`);
}