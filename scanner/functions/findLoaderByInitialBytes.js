function findLoaderByInitialBytes(loaders, data) {
    if (!data) {
      return null;
    }
    for (const loader of loaders) {
      if (typeof data === "string") {
        if (testDataAgainstText(data, loader)) {
          return loader;
        }
      } else if (ArrayBuffer.isView(data)) {
        if (testDataAgainstBinary(data.buffer, data.byteOffset, loader)) {
          return loader;
        }
      } else if (data instanceof ArrayBuffer) {
        const byteOffset = 0;
        if (testDataAgainstBinary(data, byteOffset, loader)) {
          return loader;
        }
      }
    }
    return null;
  }