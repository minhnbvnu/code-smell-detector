function startAnimation() {
      animating = true;
      lastTime = Date.now();
      startButton.textContent = 'Stop Animation';
      vectorLayer.on('postrender', moveFeature);
      // hide geoMarker and trigger map render through change event
      geoMarker.setGeometry(null);
    }