function onVRDisplayPresentChange() {

    if (isPresenting()) {

      var eyeParameters = device.getEyeParameters('left');
      var renderWidth = eyeParameters.renderWidth * framebufferScaleFactor;
      var renderHeight = eyeParameters.renderHeight * framebufferScaleFactor;

      currentPixelRatio = renderer.getPixelRatio();
      currentSize = renderer.getSize();

      renderer.setDrawingBufferSize(renderWidth * 2, renderHeight, 1);

      animation.start();

    } else {

      if (scope.enabled) {

        renderer.setDrawingBufferSize(currentSize.width, currentSize.height, currentPixelRatio);

      }

      animation.stop();

    }

  }