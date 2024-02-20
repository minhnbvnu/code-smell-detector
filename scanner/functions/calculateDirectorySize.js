function calculateDirectorySize(directoryPath) {
  let totalSize = null;

  fs.readdirSync(directoryPath, { withFileTypes: true }).forEach(item => {
    const itemPath = path.join(directoryPath, item.name);

    if (item.isDirectory()) {
      calculateDirectorySize(itemPath);
      return;
    }

    totalSize += fs.statSync(itemPath).size;
  });

  return totalSize;
}