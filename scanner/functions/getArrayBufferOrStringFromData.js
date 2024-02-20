async function getArrayBufferOrStringFromData(data, loader, options) {
    const isArrayBuffer = data instanceof ArrayBuffer || ArrayBuffer.isView(data);
    if (typeof data === "string" || isArrayBuffer) {
      return getArrayBufferOrStringFromDataSync(data, loader, options);
    }
    if (isBlob(data)) {
      data = await makeResponse(data);
    }
    if (isResponse(data)) {
      const response = data;
      await checkResponse(response);
      return loader.binary ? await response.arrayBuffer() : await response.text();
    }
    if (isReadableStream(data)) {
      data = makeIterator(data, options);
    }
    if (isIterable(data) || isAsyncIterable(data)) {
      return concatenateArrayBuffersAsync(data);
    }
    throw new Error(ERR_DATA);
  }