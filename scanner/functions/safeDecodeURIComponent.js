function safeDecodeURIComponent(str) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }