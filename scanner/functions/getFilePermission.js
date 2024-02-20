async function getFilePermission(filePath) {
  const stat = await fs.lstat(filePath);
  const permission = '0' + (stat.mode & parseInt('777', 8)).toString(8);
  return permission;
}