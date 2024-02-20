function safeMkdirSync (dir) {
  try {
    fs.readdirSync(dir);
  } catch (ex) {
    fs.mkdirSync(dir);
  }
}