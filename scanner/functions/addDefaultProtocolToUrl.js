function addDefaultProtocolToUrl(url) {
      return url.startsWith("www.") ? `http://${url}` : url;
    }