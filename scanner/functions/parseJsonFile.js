function parseJsonFile(dirPath, fileName) {
  return JSON.parse(fs.readFileSync(path.join(dirPath, fileName), 'utf8'));
}