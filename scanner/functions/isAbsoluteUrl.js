function isAbsoluteUrl(url) {
    try {
      return !!new Url(url);
    } catch (e) {
      return false;
    }
  }