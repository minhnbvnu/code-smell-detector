function initializeImageBlocks($editable) {
		var $all = wrapNakedCaptionedImages($editable);
		var $blocks = $();
		var j = $all.length;

		// Transform all of the captioned (or captionable!) images into Aloha
		// Blocks.
		while (j--) {
			if (!$all.eq(j).hasClass('aloha-block')) {
				$blocks = $blocks.add($all[j]);
			}
		}

		// Set the block type for these new Aloha Blocks to the right type.
		$blocks.alohaBlock({
			'aloha-block-type': 'CaptionedImageBlock'
		});
	}