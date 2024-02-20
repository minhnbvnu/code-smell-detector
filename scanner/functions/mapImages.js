function mapImages(imageMap, srcFolder, destFolder) {
  return through.obj(function(file, enc, cb) {
    // find the relative path to image. If any pipe has changed the filename,
    // it's the original is set in orgRelative, so we look at that first.
    var relativeFrom = file.orgRelative || file.relative;
    var relativeTo = path.join(destFolder, file.relative);
    imageMap[relativeFrom] = relativeTo;
    cb(null, file);
  });
}