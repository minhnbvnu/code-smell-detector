function getContentLengthFromHeaders(headers) {
  const contentLength = -1
  for (const [headerName, headerValue] of Object.entries(headers)) {
    if (CONTENT_LENGTH_REGEX.test(headerName)) {
      return headerValue
    }
  }
  return contentLength
}