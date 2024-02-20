function redrawDisplayCanvas() {
      displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayCtx.drawImage(
        Canvasse.el,
        // Center the canvas, then apply the current pan offset.  The half pixel
        // css it necessary to match the same offset applied to the real canvas
        // via a css transform.
        (displayCanvas.width / 2) + (Client._panX - halfWidth - .5) * Client._zoom,
        (displayCanvas.height / 2) + (Client._panY - halfHeight - .5) * Client._zoom,
        Canvasse.width * Client._zoom,
        Canvasse.height * Client._zoom
      );
    }