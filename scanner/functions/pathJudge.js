async function pathJudge(inputPath, type) {
  try {
    const stats = await fs.lstat(inputPath);
    switch (type) {
    case 'exists': return true;
    case 'isFile': return stats.isFile();
    case 'isDir': return stats.isDirectory();
    default: throw new Error('unsupported type in pathJudge function.');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}