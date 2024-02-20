function revokeImageUrl(image) {
      domGlobals.URL.revokeObjectURL(image.src);
    }