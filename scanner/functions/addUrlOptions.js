function addUrlOptions(options, url) {
    if (url && !("baseUri" in options)) {
      options.baseUri = url;
    }
  }