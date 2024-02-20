function isVideoFile(item) {
  if (item.isVideo != null) {
    return item.isVideo;
  }
  if (item.type) {
    return item.type === 'video';
  }
  if (item.url) {
    return isVideoUrl(item.url);
  }
  return false;
}