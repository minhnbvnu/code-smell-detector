async function getImgFromBlob(blob) {
  try {
    // Use this faster native browser API if available.
    // NOTE: In some browsers `window.createImageBitmap` may not exist so this will throw.
    return await window.createImageBitmap(blob);
  } catch (e) {
    try {
      return await fallbackGetImgFromBlob(blob);
    } catch (ee) {
      // Like Winamp we will silently fail on images that don't parse.
      return null;
    }
  }
}