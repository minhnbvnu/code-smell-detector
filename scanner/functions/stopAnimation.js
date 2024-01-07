function stopAnimation() {
      animating = false;
      startButton.textContent = 'Start Animation';

      // Keep marker at current animation position
      geoMarker.setGeometry(position);
      vectorLayer.un('postrender', moveFeature);
    }