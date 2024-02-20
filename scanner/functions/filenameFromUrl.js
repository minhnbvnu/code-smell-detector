function filenameFromUrl(url) {
  if (urlIsBlobUrl(url)) {
    return null;
  }

  const lastSegment = url.split("/").pop();

  if (lastSegment == null) {
    return null;
  }

  return lastSegment.split("#")[0].split("?")[0];
}