function _findModules(args) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(args.root, 'package.json'), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data).dependencies);
      }
    });
  });
}