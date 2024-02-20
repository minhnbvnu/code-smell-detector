function parseFirstLineDate(file) {
  // read
  const content = fse.readFileSync(file).toString();
  const lineFirst = content.split('\n')[0];
  const match = lineFirst.match(/\d{4}-\d{2}-\d{2}/);
  if (!match || !match[0]) return null;
  return new Date(match[0]);
}