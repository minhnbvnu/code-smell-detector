function _isImageFormatSupported(mimeType) {
    if (mimeTypeSupported[mimeType] === void 0) {
      mimeTypeSupported[mimeType] = checkFormatSupport(mimeType);
    }
    return mimeTypeSupported[mimeType];
  }