function calculateScale(width, height, wantedWidth, wantedHeight) {
  if (wantedWidth !== undefined && wantedHeight !== undefined) {
    return [wantedWidth / width, wantedHeight / height];
  }
  if (wantedWidth !== undefined) {
    return wantedWidth / width;
  }
  if (wantedHeight !== undefined) {
    return wantedHeight / height;
  }
  return 1;
}