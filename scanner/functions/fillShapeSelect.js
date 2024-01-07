function fillShapeSelect(shapeTypes) {
  Object.keys(shapeTypes)
    .sort(function (a, b) {
      return shapeTypes[b] - shapeTypes[a];
    })
    .forEach(function (shape) {
      const option = document.createElement('option');
      const sightings = shapeTypes[shape];
      option.text = `${shape} (${sightings} sighting${
        sightings === 1 ? '' : 's'
      })`;
      option.value = shape;
      shapeSelect.appendChild(option);
    });
}