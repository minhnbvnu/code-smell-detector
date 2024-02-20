function getSiteStyle() {
  let currentStyle

  Object.keys(styles).forEach((style) => {
    if (styles[style].indexOf(document.location.hostname) !== -1) {
      currentStyle = style;
    }
  });

  return currentStyle || 'small';
}