function updateLights (estimate, probeLight, directionalLight, directionalLightPosition) {
  var intensityScalar =
    Math.max(estimate.primaryLightIntensity.x,
      Math.max(estimate.primaryLightIntensity.y,
        estimate.primaryLightIntensity.z));

  probeLight.sh.fromArray(estimate.sphericalHarmonicsCoefficients);
  probeLight.intensity = 1;

  if (directionalLight) {
    directionalLight.color.setRGB(
      estimate.primaryLightIntensity.x / intensityScalar,
      estimate.primaryLightIntensity.y / intensityScalar,
      estimate.primaryLightIntensity.z / intensityScalar);

    directionalLight.intensity = intensityScalar;
    directionalLightPosition.copy(estimate.primaryLightDirection);
  }
}