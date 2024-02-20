function sanitizeRGBChunks (formattedString) {
      return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
    }