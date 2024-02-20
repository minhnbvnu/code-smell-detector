async function safeCreateImageBitmap(blob, imagebitmapOptions = null) {
    if (isEmptyObject(imagebitmapOptions) || !imagebitmapOptionsSupported) {
      imagebitmapOptions = null;
    }
    if (imagebitmapOptions) {
      try {
        return await createImageBitmap(blob, imagebitmapOptions);
      } catch (error) {
        console.warn(error);
        imagebitmapOptionsSupported = false;
      }
    }
    return await createImageBitmap(blob);
  }