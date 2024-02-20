function getBlob(arrayBuffer, url) {
    if (isSVG(url)) {
      throw new Error("SVG cannot be parsed directly to imagebitmap");
    }
    return new Blob([new Uint8Array(arrayBuffer)]);
  }