function normalizeRawHeaders(rawHeaders) {
  const normalizedHeaders = {};

  if (rawHeaders && Array.isArray(rawHeaders)) {

    for (let i = 0; i < rawHeaders.length; i += 2) {
      const key = rawHeaders[i];
      const value = rawHeaders[i + 1];

      const values = normalizedHeaders[key];
      if (values) {
        values.push(value);
      } else {
        normalizedHeaders[key] = [value];
      }
    }
  }

  return normalizedHeaders;
}