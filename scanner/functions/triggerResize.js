function triggerResize(dimension, value) {
    if (dimension === 'width') {
      (window.innerWidth) = value;
    } else if (dimension === 'height') {
      (window.innerHeight) = value;
    }

    window.dispatchEvent(new Event('resize'));
  }