function makeIterator(data, options) {
    if (typeof data === "string") {
      return makeStringIterator(data, options);
    }
    if (data instanceof ArrayBuffer) {
      return makeArrayBufferIterator(data, options);
    }
    if (isBlob(data)) {
      return makeBlobIterator(data, options);
    }
    if (isReadableStream(data)) {
      return makeStreamIterator(data, options);
    }
    if (isResponse(data)) {
      const response = data;
      return makeStreamIterator(response.body, options);
    }
    throw new Error("makeIterator");
  }