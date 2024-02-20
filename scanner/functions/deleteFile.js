function deleteFile (dir) {
  rimraf(dir, function(err) {
    if (err) throw err;
    console.log(dir);
  });
}