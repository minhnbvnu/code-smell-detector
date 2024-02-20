function taskArchive (src, dst, callback) {
  zipFolder(src, dst, err => {
    if (err) {
      throw new Error(err);
    }
    callback();
  });
}