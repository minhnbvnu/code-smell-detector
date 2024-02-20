async function parseToImage(arrayBuffer, options, url) {
    const blobOrDataUrl = getBlobOrSVGDataUrl(arrayBuffer, url);
    const URL2 = self.URL || self.webkitURL;
    const objectUrl = typeof blobOrDataUrl !== "string" && URL2.createObjectURL(blobOrDataUrl);
    try {
      return await loadToImage(objectUrl || blobOrDataUrl, options);
    } finally {
      if (objectUrl) {
        URL2.revokeObjectURL(objectUrl);
      }
    }
  }