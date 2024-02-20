function readNativeDocumentMethodString(method) {
    // Cache because this takes a long time.
    let cache = readNativeDocumentMethodString.cache;
    if (!cache) {
      cache = readNativeDocumentMethodString.cache = {};
    }
    let result = cache[method];
    if (result) {
      return result;
    }
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    result = cache[method] = String(iframe.contentDocument[method]);
    iframe.parentNode.removeChild(iframe);
    return result;
  }