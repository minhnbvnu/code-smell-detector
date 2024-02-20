async function getFileSize(filePath) {
  const stat = await fs.lstat(filePath);
  return stat.size;
}