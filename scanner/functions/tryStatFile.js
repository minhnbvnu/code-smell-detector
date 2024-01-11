async function tryStatFile(path) {
  return new Promise((resolve, reject) =>
    fs.stat(path, (error, result) => resolve(error == null && result))
  );
}