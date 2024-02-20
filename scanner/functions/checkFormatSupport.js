function checkFormatSupport(mimeType) {
    switch (mimeType) {
      case "image/webp":
        return checkWebPSupport();
      case "image/svg":
        return isBrowser;
      default:
        if (!isBrowser) {
          const { _parseImageNode: _parseImageNode2 } = globalThis;
          return Boolean(_parseImageNode2) && NODE_FORMAT_SUPPORT.includes(mimeType);
        }
        return true;
    }
  }