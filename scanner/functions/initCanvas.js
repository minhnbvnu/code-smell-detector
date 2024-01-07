function initCanvas(canvas, aspectRatio) {
  const style = canvas.style;

  // NOTE(SB) canvas.getAttribute('width') !== canvas.width: in the first case it
  // returns null or '' if no explicit value has been set to the canvas attribute.
  const renderHeight = canvas.getAttribute('height');
  const renderWidth = canvas.getAttribute('width');

  // Chart.js modifies some canvas values that we want to restore on destroy
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };

  // Force canvas to display as block to avoid extra space caused by inline
  // elements, which would interfere with the responsive resize process.
  // https://github.com/chartjs/Chart.js/issues/2538
  style.display = style.display || 'block';
  // Include possible borders in the size
  style.boxSizing = style.boxSizing || 'border-box';

  if (isNullOrEmpty(renderWidth)) {
    const displayWidth = readUsedSize(canvas, 'width');
    if (displayWidth !== undefined) {
      canvas.width = displayWidth;
    }
  }

  if (isNullOrEmpty(renderHeight)) {
    if (canvas.style.height === '') {
      // If no explicit render height and style height, let's apply the aspect ratio,
      // which one can be specified by the user but also by charts as default option
      // (i.e. options.aspectRatio). If not specified, use canvas aspect ratio of 2.
      canvas.height = canvas.width / (aspectRatio || 2);
    } else {
      const displayHeight = readUsedSize(canvas, 'height');
      if (displayHeight !== undefined) {
        canvas.height = displayHeight;
      }
    }
  }

  return canvas;
}