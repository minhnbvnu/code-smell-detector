function unlisten() {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    }