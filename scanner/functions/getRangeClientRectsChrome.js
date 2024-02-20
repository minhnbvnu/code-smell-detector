function getRangeClientRectsChrome(range) {
	  var tempRange = range.cloneRange();
	  var clientRects = [];

	  for (var ancestor = range.endContainer; ancestor != null; ancestor = ancestor.parentNode) {
	    // If we've climbed up to the common ancestor, we can now use the
	    // original start point and stop climbing the tree.
	    var atCommonAncestor = ancestor === range.commonAncestorContainer;
	    if (atCommonAncestor) {
	      tempRange.setStart(range.startContainer, range.startOffset);
	    } else {
	      tempRange.setStart(tempRange.endContainer, 0);
	    }
	    var rects = Array.from(tempRange.getClientRects());
	    clientRects.push(rects);
	    if (atCommonAncestor) {
	      var _ref;

	      clientRects.reverse();
	      return (_ref = []).concat.apply(_ref, clientRects);
	    }
	    tempRange.setEndBefore(ancestor);
	  }

	   true ?  true ? invariant(false, 'Found an unexpected detached subtree when getting range client rects.') : invariant(false) : void 0;
	}