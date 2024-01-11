async function publishReleaseAsync(options) {
  return new Promise((resolve, reject) => {
    publishRelease(options, (err, release) => {
      if (err) {
        reject(err);
      } else {
        resolve(release);
      }
    });
  });
}