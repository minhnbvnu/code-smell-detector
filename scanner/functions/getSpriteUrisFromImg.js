function getSpriteUrisFromImg(img, sprites) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context == null) {
    throw new Error("Failed to get canvas context");
  }

  const images = {};
  sprites.forEach(sprite => {
    canvas.height = sprite.height;
    canvas.width = sprite.width;
    context.drawImage(img, -sprite.x, -sprite.y);
    const image = canvas.toDataURL();
    images[sprite.name] = image;
  });
  return images;
}