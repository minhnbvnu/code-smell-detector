function readTextFile(fpath) {
  // This function used to use File#eof and File#readln(), but
  // that failed to read the last line when missing a final newline.
  return readFile(fpath, 'UTF-8') || '';
}