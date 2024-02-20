function jumpBlock(block, isGoingLeft, currentRange) {
		var range = new GENTICS.Utils.RangeObject();
		var sibling = isGoingLeft ? prevVisibleNode(block) : nextVisibleNode(block);

		if (!sibling || isBlock(sibling)) {
			var $landing = jQuery('<div class="aloha-placeholder aloha-editing-div">&nbsp;</div>');

			if (isGoingLeft) {
				jQuery(block).before($landing);
			} else {
				jQuery(block).after($landing);
			}

			range.startContainer = range.endContainer = $landing[0];
			range.startOffset = range.endOffset = 0;

			// Clear out any old placeholder first ...
			cleanupPlaceholders(range);

			window.$_alohaPlaceholder = $landing;
		} else {

			// Don't jump the block yet if the cursor is moving to the
			// beginning or end of a text node, or if it is about to leave
			// an element node. Both these cases require a hack in some
			// browsers.
			var moveToBoundaryPositionInIE = ( // To the beginning or end of a text node?
				(currentRange.startContainer.nodeType === 3
				 && currentRange.startContainer === currentRange.endContainer
				 && currentRange.startContainer.nodeValue !== ""
				 && (isGoingLeft ? currentRange.startOffset === 1 : currentRange.endOffset + 1 === currentRange.endContainer.length))
				// Leaving an element node?
					|| (currentRange.startContainer.nodeType === 1
						&& (!currentRange.startOffset
							|| (currentRange.startContainer.childNodes[currentRange.startOffset] && currentRange.startContainer.childNodes[currentRange.startOffset].nodeType === 1)))
			);

			if (moveToBoundaryPositionInIE) {
				// The cursor is moving to the beginning or end of a text
				// node, or is leaving an element node, which requires a
				// hack in some browsers.
				var zeroWidthNode = BlockJump.insertZeroWidthTextNodeFix(block, isGoingLeft);
				range.startContainer = range.endContainer = zeroWidthNode;
				range.startOffset = range.endOffset = isGoingLeft ? 1 : 0;
			} else {
				// The selection is already at the boundary position - jump
				// the block.
				range.startContainer = range.endContainer = sibling;
				range.startOffset = range.endOffset = isGoingLeft ? nodeLength(sibling) : 0;
				if (!isGoingLeft) {
					// Just as above, jumping to the first position right of
					// a block requires a hack in some browsers. Jumping
					// left seems to be fine.
					BlockJump.insertZeroWidthTextNodeFix(block, true);
				}
			}
			cleanupPlaceholders(range);
		}

		range.select();

		Aloha.trigger('aloha-block-selected', block);
		Aloha.Selection.preventSelectionChanged();
	}