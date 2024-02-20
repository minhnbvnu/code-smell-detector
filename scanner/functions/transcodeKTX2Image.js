function transcodeKTX2Image(ktx2File, levelIndex, options) {
    const { alphaFlag, height, width } = ktx2File.getImageLevelInfo(levelIndex, 0, 0);
    const { compressed, format, basisFormat } = getBasisOptions(options, alphaFlag);
    const decodedSize = ktx2File.getImageTranscodedSizeInBytes(levelIndex, 0, 0, basisFormat);
    const decodedData = new Uint8Array(decodedSize);
    if (!ktx2File.transcodeImage(decodedData, levelIndex, 0, 0, basisFormat, 0, -1, -1)) {
      return null;
    }
    return {
      width,
      height,
      data: decodedData,
      compressed,
      alphaFlag,
      format
    };
  }