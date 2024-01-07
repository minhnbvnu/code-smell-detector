function newImageData(data, width, height) {
  if (hasImageData) {
    return new ImageData(data, width, height);
  }

  if (!context) {
    context = document.createElement('canvas').getContext('2d');
  }
  const imageData = context.createImageData(width, height);
  imageData.data.set(data);
  return imageData;
}