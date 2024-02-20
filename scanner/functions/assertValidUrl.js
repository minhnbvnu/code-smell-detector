function assertValidUrl (url) {
  return assert(validator.isURL(url, { allow_protocol_relative_urls: true }),
    `${url} is not a valid url`);
}