function selectStyleFunction(feature) {
  const styles = [
    new Style({
      image: new CircleStyle({
        radius: feature.get('radius'),
        fill: invisibleFill,
      }),
    }),
  ];
  const originalFeatures = feature.get('features');
  let originalFeature;
  for (let i = originalFeatures.length - 1; i >= 0; --i) {
    originalFeature = originalFeatures[i];
    styles.push(createEarthquakeStyle(originalFeature));
  }
  return styles;
}