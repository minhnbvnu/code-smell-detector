function getImageType(image) {
    const format = getImageTypeOrNull(image);
    if (!format) {
      throw new Error("Not an image");
    }
    return format;
  }