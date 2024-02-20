function canvasToDataURL(canvas, type, quality) {
      type = type || 'image/png';
      return canvas.toDataURL(type, quality);
    }