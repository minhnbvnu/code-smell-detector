async function getImageMetadata(filePath) {
  return await sharp(filePath).metadata();
}