async function resizeImage(filePath, maxWidth, maxHeight) {
  const metadata = await getImageMetadata(filePath);
  const {width, height} = metadata;

  let imageData = null;
  const {resizeWidth, resizeHeight} = getResizeDimension(width, height, maxWidth, maxHeight);

  if (resizeWidth === width && resizeHeight === height) {
    imageData = fs.readFileSync(filePath);
  } else {
    imageData = await sharp(filePath)
      .resize(resizeWidth, resizeHeight, {fit: 'inside'})
      .toBuffer()
      .then(data => data);
  }

  return {
    width: resizeWidth,
    height: resizeHeight,
    data: imageData
  };
}