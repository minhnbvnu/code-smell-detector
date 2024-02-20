function getMaxSize(sizes) {
  var maxWidthSize = sizes.reduce(function (a, b) {
    return a.width > b.width || (a.width === b.width && a.height > b.height) ? a : b;
  });

  var maxHeightSize = sizes.reduce(function (a, b) {
    return a.height > b.height || (a.height === b.height && a.width > b.width) ? a : b;
  });

  var maxSize;

  if (maxWidthSize.width > maxHeightSize.height ||
      (maxWidthSize.width === maxHeightSize.height && maxWidthSize.height > maxHeightSize.width)) {
    maxSize = maxWidthSize;
  } else {
    maxSize = maxHeightSize;
  }

  return maxSize;
}