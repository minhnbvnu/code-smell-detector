function decodeInlineStyleRanges(text, ranges) {
	  var styles = Array(text.length).fill(EMPTY_SET);
	  if (ranges) {
	    ranges.forEach(function ( /*object*/range) {
	      var cursor = substr(text, 0, range.offset).length;
	      var end = cursor + substr(text, range.offset, range.length).length;
	      while (cursor < end) {
	        styles[cursor] = styles[cursor].add(range.style);
	        cursor++;
	      }
	    });
	  }
	  return styles;
	}