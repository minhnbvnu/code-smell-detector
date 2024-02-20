function isVideoMimeType(mimeType) {
  return /^video\/[^*]+$/.test(mimeType);
}