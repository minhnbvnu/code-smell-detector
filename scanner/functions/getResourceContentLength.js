function getResourceContentLength(resource) {
    if (isResponse(resource)) {
      return resource.headers["content-length"] || -1;
    }
    if (isBlob(resource)) {
      return resource.size;
    }
    if (typeof resource === "string") {
      return resource.length;
    }
    if (resource instanceof ArrayBuffer) {
      return resource.byteLength;
    }
    if (ArrayBuffer.isView(resource)) {
      return resource.byteLength;
    }
    return -1;
  }