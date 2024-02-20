function getBinaryImageMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    return getPngMetadata(dataView) || getJpegMetadata(dataView) || getGifMetadata(dataView) || getBmpMetadata(dataView);
  }