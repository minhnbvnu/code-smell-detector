function getResourceUrlAndType(resource) {
    if (isResponse(resource)) {
      const url = stripQueryString(resource.url || "");
      const contentTypeHeader = resource.headers.get("content-type") || "";
      return {
        url,
        type: parseMIMEType(contentTypeHeader) || parseMIMETypeFromURL(url)
      };
    }
    if (isBlob(resource)) {
      return {
        url: stripQueryString(resource.name || ""),
        type: resource.type || ""
      };
    }
    if (typeof resource === "string") {
      return {
        url: stripQueryString(resource),
        type: parseMIMETypeFromURL(resource)
      };
    }
    return {
      url: "",
      type: ""
    };
  }