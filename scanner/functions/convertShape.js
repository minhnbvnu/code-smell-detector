function convertShape (shape, tag) {
	  return templates.element({
	    'tag': tag,
	    'width': shape.width,
	    'height': shape.height,
	    'fill': shape.properties.fill
	  });
	}