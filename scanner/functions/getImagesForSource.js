function getImagesForSource(source, options) {
  let request;
  if (source.blob) {
    request = tiffFromBlob(source.blob);
  } else if (source.overviews) {
    request = tiffFromUrls(source.url, source.overviews, options);
  } else {
    request = tiffFromUrl(source.url, options);
  }
  return request.then(getImagesForTIFF);
}