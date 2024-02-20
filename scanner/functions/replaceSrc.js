function replaceSrc(imageMap) {
  return through.obj(function(file, enc, cb) {
    file.$el = file.$el || cheerio.load(file.contents.toString());

    var changed = false;

    // loop over each image
    file.$el("img").each(function(i, el) {
      // convert el to cheerio el
      var jel = file.$el(this);
      var src = jel.attr("src");

      //make sure to convert the src attribute to the specific OS format, so they are correctly matched in the imageMap
      //e.g. on windows slashes are converted to backslashes like for instance images/fig01.png -> images\fig01.png
      if (src && !src.match(/^http/)) {
        src = path.normalize(src)
      }


      // if this image exists in source folder,
      // replace src with new source
      if (imageMap[src]) {
        // this file has changed
        changed = true;

        // find the relative path from the image to the file
        var srcRelative = path.relative(
          path.dirname(file.relative),
          imageMap[src]
        );

        jel.attr("src", srcRelative);
      } else if (!src.match(/^http/)) {
        console.log("image not found in source folder: " + src);
      }
    });

    // only if we find an image, replace contents in file
    if (changed) {
      file.contents = Buffer.from(file.$el("body").html());
    }

    debug(file.path, file.contents.toString().substring(0, 20));

    cb(null, file);
  });
}