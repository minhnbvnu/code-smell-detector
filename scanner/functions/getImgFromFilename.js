async function getImgFromFilename(zip, fileName) {
  // Winamp only supports .bmp images, but WACUP set a precidence of supporting
  // .png as well to reduce size. Since we care about size as well, we follow
  // suit. Our default skin uses .png to save 14kb.
  const file = await getFileFromZip(zip, fileName, "(png|bmp)", "blob");

  if (!file) {
    return null;
  }

  const mimeType = `image/${getFileExtension(file.name) || "*"}`; // The spec for createImageBitmap() says the browser should try to sniff the
  // mime type, but it looks like Firefox does not. So we specify it here
  // explicitly.

  const typedBlob = new Blob([file.contents], {
    type: mimeType
  });
  return getImgFromBlob(typedBlob);
}