function parseBasisFile(BasisFile, data, options) {
    const basisFile = new BasisFile(new Uint8Array(data));
    try {
      if (!basisFile.startTranscoding()) {
        return null;
      }
      const imageCount = basisFile.getNumImages();
      const images = [];
      for (let imageIndex = 0; imageIndex < imageCount; imageIndex++) {
        const levelsCount = basisFile.getNumLevels(imageIndex);
        const levels = [];
        for (let levelIndex = 0; levelIndex < levelsCount; levelIndex++) {
          levels.push(transcodeImage(basisFile, imageIndex, levelIndex, options));
        }
        images.push(levels);
      }
      return images;
    } finally {
      basisFile.close();
      basisFile.delete();
    }
  }