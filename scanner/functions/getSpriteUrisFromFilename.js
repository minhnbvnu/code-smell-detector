async function getSpriteUrisFromFilename(zip, fileName) {
  const img = await getImgFromFilename(zip, fileName);

  if (img == null) {
    return {};
  }

  return getSpriteUrisFromImg(img, skinSprites[fileName]);
}