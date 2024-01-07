function createStyleDefaults() {
  DEFAULT_COLOR = [255, 255, 255, 1];

  DEFAULT_FILL_STYLE = new Fill({
    color: DEFAULT_COLOR,
  });

  DEFAULT_IMAGE_STYLE_ANCHOR = [20, 2];

  DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS = 'pixels';

  DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS = 'pixels';

  DEFAULT_IMAGE_STYLE_SIZE = [64, 64];

  DEFAULT_IMAGE_STYLE_SRC =
    'https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png';

  DEFAULT_IMAGE_STYLE = new Icon({
    anchor: DEFAULT_IMAGE_STYLE_ANCHOR,
    anchorOrigin: 'bottom-left',
    anchorXUnits: DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS,
    anchorYUnits: DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS,
    crossOrigin: 'anonymous',
    rotation: 0,
    scale: scaleForSize(DEFAULT_IMAGE_STYLE_SIZE),
    size: DEFAULT_IMAGE_STYLE_SIZE,
    src: DEFAULT_IMAGE_STYLE_SRC,
  });

  DEFAULT_NO_IMAGE_STYLE = 'NO_IMAGE';

  DEFAULT_STROKE_STYLE = new Stroke({
    color: DEFAULT_COLOR,
    width: 1,
  });

  DEFAULT_TEXT_STROKE_STYLE = new Stroke({
    color: [51, 51, 51, 1],
    width: 2,
  });

  DEFAULT_TEXT_STYLE = new Text({
    font: 'bold 16px Helvetica',
    fill: DEFAULT_FILL_STYLE,
    stroke: DEFAULT_TEXT_STROKE_STYLE,
    scale: 0.8,
  });

  DEFAULT_STYLE = new Style({
    fill: DEFAULT_FILL_STYLE,
    image: DEFAULT_IMAGE_STYLE,
    text: DEFAULT_TEXT_STYLE,
    stroke: DEFAULT_STROKE_STYLE,
    zIndex: 0,
  });

  DEFAULT_STYLE_ARRAY = [DEFAULT_STYLE];
}