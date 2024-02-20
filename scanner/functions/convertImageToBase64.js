function convertImageToBase64(image) {
  if (Array.isArray(image.data)) {
    image.data = base64js.fromByteArray(Uint8Array.from(image.data));
  }
}