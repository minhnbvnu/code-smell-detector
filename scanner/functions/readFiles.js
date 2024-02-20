function readFiles (files) {
  return files.map(f => {
    return fs.readFileSync(f).toString();
  }).join('\n');
}