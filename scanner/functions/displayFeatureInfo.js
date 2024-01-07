function displayFeatureInfo(pixel, width) {
  const feature = map.getFeaturesAtPixel(pixel)[0];
  if (feature) {
    const featurePixel = map.getPixelFromCoordinate(
      feature.getGeometry().getCoordinates(),
    );
    if (featurePixel[0] > width) {
      featurePixel[0] = featurePixel[0] % width;
    } else if (featurePixel[1] < width) {
      featurePixel[0] = width + (featurePixel[0] % width);
    }
    info.style.top = featurePixel[1] + 'px';
    if (featurePixel[0] < width / 2) {
      info.style.left = featurePixel[0] + 'px';
      info.style.right = 'auto';
    } else {
      info.style.right = width - featurePixel[0] + 'px';
      info.style.left = 'auto';
    }
    if (feature !== currentFeature) {
      info.style.visibility = 'visible';
      info.innerHTML =
        feature.get('name') + '<br>' + feature.get('pop_max').toLocaleString();
    }
  } else if (currentFeature) {
    info.style.visibility = 'hidden';
  }
  currentFeature = feature;
}