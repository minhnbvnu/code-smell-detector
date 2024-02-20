async function createAvif({ fileBuffer, lossless, config }) {
  const imageFormat = await getImageFormat(fileBuffer);

  if (!['jpeg', 'png', 'gif'].includes(imageFormat)) {
    return fileBuffer;
  }

  return sharp(fileBuffer)
    .avif((lossless ? config?.lossless : config?.lossy) || {})
    .toBuffer();
}