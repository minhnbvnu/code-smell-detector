function parseLinkHeader(header) {
  return header.split(',').reduce(reducer, {});
}