function resizeDisplayCanvas() {
      var containerRect = container.getBoundingClientRect();
      displayCanvas.width = containerRect.width;
      displayCanvas.height = containerRect.height;
      // Here's the magic.  These flags are reset any time the canvas resize
      // changes, so they need to be set here.
      displayCtx.mozImageSmoothingEnabled = false;
      displayCtx.webkitImageSmoothingEnabled = false;
      displayCtx.msImageSmoothingEnabled = false;
      displayCtx.imageSmoothingEnabled = false;
      redrawDisplayCanvas();
    }