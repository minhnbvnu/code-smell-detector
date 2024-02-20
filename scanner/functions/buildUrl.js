function buildUrl(url, serializedParams) {
      if (serializedParams.length > 0) {
        url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
      }
      return url;
    }