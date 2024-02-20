async function genGenTextSprites(zip) {
  const img = await getImgFromFilename(zip, "GEN");

  if (img == null) {
    return null;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);

  const getLetters = (y, prefix) => {
    const getColorAt = x => context.getImageData(x, y, 1, 1).data.join(",");

    let x = 1;
    const backgroundColor = getColorAt(0);
    const height = 7;
    return LETTERS.map(letter => {
      let nextBackground = x;

      while (getColorAt(nextBackground) !== backgroundColor && nextBackground < canvas.width) {
        nextBackground++;
      }

      const width = nextBackground - x;
      const name = `${prefix}_${letter}`;
      const sprite = {
        x,
        y,
        height,
        width,
        name
      };
      x = nextBackground + 1;
      return sprite;
    });
  };

  const letterWidths = {};
  const sprites = [...getLetters(88, "GEN_TEXT_SELECTED"), ...getLetters(96, "GEN_TEXT")];
  sprites.forEach(sprite => {
    letterWidths[sprite.name] = sprite.width;
  });
  return [letterWidths, getSpriteUrisFromImg(img, sprites)];
}