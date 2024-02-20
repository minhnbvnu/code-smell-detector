function newURI(uriStr, base) {
    try {
      let baseURI = base ? ios.newURI(base) : null;
      return ios.newURI(uriStr, null, baseURI);
    }
    catch (e) {
      if (e.result == Cr.NS_ERROR_MALFORMED_URI) {
        throw new Error("malformed URI: " + uriStr);
      }
      if (e.result == Cr.NS_ERROR_FAILURE ||
          e.result == Cr.NS_ERROR_ILLEGAL_VALUE) {
        throw new Error("invalid URI: " + uriStr);
      }
    }
  }