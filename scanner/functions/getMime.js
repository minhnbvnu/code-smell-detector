function getMime(fileName, filePath, callback) {
  var ext = path.extname(fileName);
  var presetMime = mime.lookup(fileName);

  if (presetMime) {
    callback(null, presetMime);
  } else {
    const buffer = readChunk.sync(filePath, 0, 4100);
    var mimeType = fileType(buffer);
    callback(null, mimeType);
  }
}