function loadJSON(filePath) {
  if (fs.readFile) {
    // node
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(parseJSON(data, filePath));
        }
      });
    });
  }
  return fetch(filePath)
    .then(resp => resp.text())
    .then(data => parseJSON(data, filePath));
}