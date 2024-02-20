function getDefaultImageType() {
    if (IMAGE_BITMAP_SUPPORTED) {
      return "imagebitmap";
    }
    if (IMAGE_SUPPORTED) {
      return "image";
    }
    if (DATA_SUPPORTED) {
      return "data";
    }
    throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
  }