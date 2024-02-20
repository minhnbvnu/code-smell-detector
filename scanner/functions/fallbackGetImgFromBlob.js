function fallbackGetImgFromBlob(blob) {
  return imgFromUrl(URL.createObjectURL(blob));
}