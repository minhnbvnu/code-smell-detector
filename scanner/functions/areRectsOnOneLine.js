function areRectsOnOneLine(rects, lineHeight) {
	  var minTop = Infinity;
	  var minBottom = Infinity;
	  var maxTop = -Infinity;
	  var maxBottom = -Infinity;

	  for (var ii = 0; ii < rects.length; ii++) {
	    var rect = rects[ii];
	    if (rect.width === 0 || rect.width === 1) {
	      // When a range starts or ends a soft wrap, many browsers (Chrome, IE,
	      // Safari) include an empty rect on the previous or next line. When the
	      // text lies in a container whose position is not integral (e.g., from
	      // margin: auto), Safari makes these empty rects have width 1 (instead of
	      // 0). Having one-pixel-wide characters seems unlikely (and most browsers
	      // report widths in subpixel precision anyway) so it's relatively safe to
	      // skip over them.
	      continue;
	    }
	    minTop = Math.min(minTop, rect.top);
	    minBottom = Math.min(minBottom, rect.bottom);
	    maxTop = Math.max(maxTop, rect.top);
	    maxBottom = Math.max(maxBottom, rect.bottom);
	  }

	  return maxTop <= minBottom && maxTop - minTop < lineHeight && maxBottom - minBottom < lineHeight;
	}