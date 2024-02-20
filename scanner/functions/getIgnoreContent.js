async function getIgnoreContent(ignoreFilePath) {
  let fileContent = '';

  if (fs.existsSync(ignoreFilePath)) {
    fileContent = await fs.readFile(ignoreFilePath, 'utf8');
  }
  return fileContent;
}