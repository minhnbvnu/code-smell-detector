function getPackage(startPath, getPath = false) {
  let current = path.resolve(startPath);
  while (true) {
    const filename = path.join(current, 'package.json');
    try {
      const source = fs.readFileSync(filename, 'utf8');
      const json = JSON.parse(source);
      json.__filename = filename;
      json.__dirname = current;
      return getPath ? {configPath: filename, json} : json;
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'ENOTDIR') {
        const next = path.join(current, '..');
        if (next === current) {
          return null;
        } else {
          current = next;
        }
      } else {
        throw err;
      }
    }
  }
}