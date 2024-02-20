function isImageFile(item) {
  if (item.isImage != null) {
    return item.isImage;
  }
  if (item.type) {
    return item.type === 'image';
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  return false;
}