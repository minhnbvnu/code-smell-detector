function readAndParse(specPath) {
  const filePath = path.join(__dirname, specPath);
  return parse(fs.readFileSync(filePath, 'utf-8'), filePath);
}