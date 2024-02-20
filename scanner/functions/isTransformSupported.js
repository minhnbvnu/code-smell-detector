function isTransformSupported(style) {
	  return 'transform' in style || 'webkitTransform' in style || 'MozTransform' in style;
	}