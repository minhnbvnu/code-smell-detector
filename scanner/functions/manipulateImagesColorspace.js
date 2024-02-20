function manipulateImagesColorspace(colorspace) {
  return through.obj(async (file, _, cb) => {
    if (file.isBuffer()) {
      try {
        const convertedFile = await sharp(file.contents)
          .toColorspace(colorspace)
          .toBuffer();

        file.contents = convertedFile;
        cb(null, file);
      } catch (error) {
        cb(new Error(`Error converting ${file.relative} to black and white: ${error.message}`));
      }
    } else {
      cb(null, file);
    }
  })
}