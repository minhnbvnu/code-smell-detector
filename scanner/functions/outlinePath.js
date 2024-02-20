function outlinePath (bgWidth, bgHeight, outlineWidth) {
	  var outlineOffsetWidth = outlineWidth / 2;

	  return [
	    'M', outlineOffsetWidth, outlineOffsetWidth,
	    'H', bgWidth - outlineOffsetWidth,
	    'V', bgHeight - outlineOffsetWidth,
	    'H', outlineOffsetWidth,
	    'V', 0,
	    'M', 0, outlineOffsetWidth,
	    'L', bgWidth, bgHeight - outlineOffsetWidth,
	    'M', 0, bgHeight - outlineOffsetWidth,
	    'L', bgWidth, outlineOffsetWidth
	  ].join(' ');
	}