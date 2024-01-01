function isImageCb (url) {
    validatedUrls.push(url);
    if (validatedUrls.length === 6) {
      cb(validatedUrls);
    }
  }