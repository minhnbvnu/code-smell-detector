function getImageTypeOrNull(image) {
    if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      return "imagebitmap";
    }
    if (typeof Image !== "undefined" && image instanceof Image) {
      return "image";
    }
    if (image && typeof image === "object" && image.data && image.width && image.height) {
      return "data";
    }
    return null;
  }