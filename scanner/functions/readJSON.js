function readJSON(path) {
  return JSON.parse(fs.readFileSync(path));
}