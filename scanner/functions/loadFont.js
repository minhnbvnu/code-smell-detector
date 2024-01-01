function loadFont (src, yOffset) {
  return new Promise(function (resolve, reject) {
    loadBMFont(src, function (err, font) {
      if (err) {
        error('Error loading font', src);
        reject(err);
        return;
      }

      // Fix negative Y offsets for Roboto MSDF font from tool. Experimentally determined.
      if (src.indexOf('/Roboto-msdf.json') >= 0) { yOffset = 30; }
      if (yOffset) { font.chars.map(function doOffset (ch) { ch.yoffset += yOffset; }); }

      resolve(font);
    });
  });
}