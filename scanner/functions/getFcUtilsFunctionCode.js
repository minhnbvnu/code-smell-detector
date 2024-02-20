async function getFcUtilsFunctionCode(filename) {
  return await fs.readFile(path.join(__dirname, 'utils', filename));
}