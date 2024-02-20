function  sanitizeHexChunksToRGB (str) {
      return filterStringChunks(R_HEX, str, convertHexToRGB);
    }