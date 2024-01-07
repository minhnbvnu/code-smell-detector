function get(image, cacheKey, crossOrigin, imageState, color, pattern) {
  let iconImage =
    cacheKey === undefined
      ? undefined
      : iconImageCache.get(cacheKey, crossOrigin, color);
  if (!iconImage) {
    iconImage = new IconImage(
      image,
      image instanceof HTMLImageElement ? image.src || undefined : cacheKey,
      crossOrigin,
      imageState,
      color,
    );
    iconImageCache.set(cacheKey, crossOrigin, color, iconImage, pattern);
  }
  if (
    pattern &&
    iconImage &&
    !iconImageCache.getPattern(cacheKey, crossOrigin, color)
  ) {
    iconImageCache.set(cacheKey, crossOrigin, color, iconImage, pattern);
  }
  return iconImage;
}