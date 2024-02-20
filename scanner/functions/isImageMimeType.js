function isImageMimeType(mimeType) {
  return /^image\/[^*]+$/.test(mimeType);
}