function hitDetect(pixel, features, imageData) {
  /** @type {Array<F>} */
  const resultFeatures = [];
  if (imageData) {
    const x = Math.floor(Math.round(pixel[0]) * HIT_DETECT_RESOLUTION);
    const y = Math.floor(Math.round(pixel[1]) * HIT_DETECT_RESOLUTION);
    // The pixel coordinate is clamped down to the hit-detect canvas' size to account
    // for browsers returning coordinates slightly larger than the actual canvas size
    // due to a non-integer pixel ratio.
    const index =
      (clamp(x, 0, imageData.width - 1) +
        clamp(y, 0, imageData.height - 1) * imageData.width) *
      4;
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const i = b + 256 * (g + 256 * r);
    const indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);
    if (i && i % indexFactor === 0) {
      resultFeatures.push(features[i / indexFactor - 1]);
    }
  }
  return resultFeatures;
}