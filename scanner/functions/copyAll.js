function copyAll(filesToCopy) {
  const queue = Object.keys(filesToCopy);
  if (queue.length === 0) {
    return Promise.resolve();
  }

  log('Copying ' + queue.length + ' asset files');
  return new Promise((resolve, reject) => {
    const copyNext = (error) => {
      if (error) {
        return reject(error);
      }
      if (queue.length === 0) {
        log('Done copying assets');
        resolve();
      } else {
        const src = queue.shift();
        const dest = filesToCopy[src];
        copy(src, dest, copyNext);
      }
    };
    copyNext();
  });
}