function newWorkerImageData(data, width, height) {
    if (workerHasImageData) {
      return new ImageData(data, width, height);
    }
    return {data: data, width: width, height: height};
  }