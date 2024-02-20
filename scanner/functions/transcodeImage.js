function transcodeImage(basisFile, imageIndex, levelIndex, options) {
    const width = basisFile.getImageWidth(imageIndex, levelIndex);
    const height = basisFile.getImageHeight(imageIndex, levelIndex);
    const hasAlpha = basisFile.getHasAlpha();
    const { compressed, format, basisFormat } = getBasisOptions(options, hasAlpha);
    const decodedSize = basisFile.getImageTranscodedSizeInBytes(imageIndex, levelIndex, basisFormat);
    const decodedData = new Uint8Array(decodedSize);
    if (!basisFile.transcodeImage(decodedData, imageIndex, levelIndex, basisFormat, 0, 0)) {
      return null;
    }
    return {
      width,
      height,
      data: decodedData,
      compressed,
      hasAlpha,
      format
    };
  }