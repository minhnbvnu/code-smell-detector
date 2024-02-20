async function readBootstrapContent(bootstrapPath) {
  if (!await fs.pathExists(bootstrapPath)) {
    throw new Error('could not found bootstrap file');
  }

  if (isBinary(bootstrapPath)) {
    throw new Error('bootstrap file is a binary, not the expected text file.');
  }

  return await fs.readFile(bootstrapPath, 'utf8');
}