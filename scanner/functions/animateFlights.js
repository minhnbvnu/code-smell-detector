function animateFlights(event) {
  const vectorContext = getVectorContext(event);
  const frameState = event.frameState;
  vectorContext.setStyle(style);

  const features = flightsSource.getFeatures();
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      const coords = feature.getGeometry().getCoordinates();
      const elapsedTime = frameState.time - feature.get('start');
      if (elapsedTime >= 0) {
        const elapsedPoints = elapsedTime * pointsPerMs;

        if (elapsedPoints >= coords.length) {
          feature.set('finished', true);
        }

        const maxIndex = Math.min(elapsedPoints, coords.length);
        const currentLine = new LineString(coords.slice(0, maxIndex));

        // animation is needed in the current and nearest adjacent wrapped world
        const worldWidth = getWidth(map.getView().getProjection().getExtent());
        const offset = Math.floor(map.getView().getCenter()[0] / worldWidth);

        // directly draw the lines with the vector context
        currentLine.translate(offset * worldWidth, 0);
        vectorContext.drawGeometry(currentLine);
        currentLine.translate(worldWidth, 0);
        vectorContext.drawGeometry(currentLine);
      }
    }
  }
  // tell OpenLayers to continue the animation
  map.render();
}