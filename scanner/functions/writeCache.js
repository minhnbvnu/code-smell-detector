function writeCache (content, _path) {
  fs.writeFileSync(_path, JSON.stringify(content), 'utf8');
}