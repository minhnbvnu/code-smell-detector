function setSource() {
  const source = new Static({
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/' +
      'British_National_Grid.svg/2000px-British_National_Grid.svg.png',
    crossOrigin: '',
    projection: 'EPSG:27700',
    imageExtent: imageExtent,
    interpolate: interpolate.checked,
  });
  imageLayer.setSource(source);
}