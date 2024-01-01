function validateSrc (src, isImageCb, isVideoCb) {
  checkIsImage(src, function isAnImageUrl (isImage) {
    if (isImage) {
      isImageCb(src);
      return;
    }
    isVideoCb(src);
  });
}