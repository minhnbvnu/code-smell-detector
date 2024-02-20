function rmFile(file) {
  try {
    fs.unlinkSync(file);
  } catch(e) {
    /* seriously, unlink throws when the file doesn't exist :( */
  }
}