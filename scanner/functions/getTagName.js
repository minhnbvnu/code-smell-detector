function getTagName(string) {
  if (string === 'A') {
    return 'Anchor';
  }
  if (string === 'IMG') {
    return 'Image';
  }
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}