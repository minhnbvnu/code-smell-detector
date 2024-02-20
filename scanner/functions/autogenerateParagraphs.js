function autogenerateParagraphs(editable) {
		if (!editable) {
			return;
		}
		var $obj = editable.obj;
		if (!$obj) {
			return;
		}
		var obj = $obj[0], i, j, selectionRange = Aloha.Selection.rangeObject, contentChanged = false;

		// check whether nesting of paragraphs inside the editable is allowed
		if (!Dom.allowsNesting(obj, $('<p></p>')[0])) {
			return;
		}

		// collect lists of subsequent child elements of the editable,
		// that are no block level elements (and thus need to be wrapped
		// into a paragraph)
		var nonBlockRanges = [];
		var current;
		$obj.contents().each(function () {
			if (!Html.isBlock(this)) {
				if (!current) {
					// start a new list
					current = {
						objs: []
					};
					nonBlockRanges.push(current);
				}

				// add the DOM element to the current list
				current.objs.push(this);
			} else {
				// we found a block element, so we are done with the current list
				current = null;
			}
		});

		// wrap all non-block lists into p Tags
		// in other words: replace the list of sibling DOM elements with
		// a single (new) paragraph, that will contain the list of DOM
		// elements as children
		for (i = 0; i < nonBlockRanges.length; i++) {
			var range = nonBlockRanges[i];
			var indexStart = Dom.getIndexInParent(range.objs[0]);
			var indexEnd = Dom.getIndexInParent(range.objs[range.objs.length - 1]);
			var $p = $('<p></p>');

			// correct the start of the selection range, if necessary
			if (selectionRange.startContainer === obj) {
				if (selectionRange.startOffset > indexStart && selectionRange.startOffset <= indexEnd) {
					selectionRange.startContainer = $p[0];
					selectionRange.startOffset -= indexStart;
				} else if (selectionRange.startOffset > indexEnd) {
					selectionRange.startOffset -= (indexEnd - indexStart);
				}
			}
			// correct the end of the selection range, if necessary
			if (selectionRange.endContainer === obj) {
				if (selectionRange.endOffset > indexStart && selectionRange.endOffset <= indexEnd) {
					selectionRange.endContainer = $p[0];
					selectionRange.endOffset -= indexStart;
				} else if (selectionRange.endOffset > indexEnd) {
					selectionRange.endOffset -= (indexEnd - indexStart);
				}
			}

			// insert the paragraph right before the old dom elements
			$(range.objs[0]).before($p);
			// move all old dom elements into the paragraph
			for (j = 0; j < range.objs.length; j++) {
				$p[0].appendChild(range.objs[j]);
			}
			contentChanged = true;
		}

		// select the corrected selection, but only if we changed
		// something in the content and the editable is the active one
		if (contentChanged && editable.isActive) {
			selectionRange.select();
		}
	}