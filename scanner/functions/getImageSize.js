function getImageSize(contents, mimeType) {
  const ERR_INVALID_TYPE = `Invalid MIME type. Supported MIME types are: ${Array.from(
    mimeTypeMap.keys()
  ).join(', ')}`;

  // Looking for only a specific MIME type.
  if (mimeType) {
    const handler = mimeTypeMap.get(mimeType);
    if (!handler) {
      throw new Error(ERR_INVALID_TYPE);
    }

    const result = handler(contents);
    if (!result) {
      throw new Error(`invalid image data for type: ${mimeType}`);
    }
    return result;
  }

  // Loop through each file type and see if they work.
  for (const [supportedMimeType, handler] of mimeTypeMap.entries()) {
    const result = handler(contents);
    if (result) {
      result.mimeType = supportedMimeType;
      return result;
    }
  }

  // Seems not :(
  throw new Error(ERR_INVALID_TYPE);
}