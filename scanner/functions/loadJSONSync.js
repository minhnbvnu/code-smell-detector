function loadJSONSync(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return parseJSON(content);
}