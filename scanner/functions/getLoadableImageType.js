function getLoadableImageType(type) {
    switch (type) {
      case "auto":
      case "data":
        return getDefaultImageType();
      default:
        isImageTypeSupported(type);
        return type;
    }
  }