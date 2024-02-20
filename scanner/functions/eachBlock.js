function eachBlock($context, fn) {
		var $blocks = $context.find('.aloha-captioned-image-block');
		$blocks.each(function (i, blockElem) {
			var block = BlockManager.getBlock(blockElem);
			if (block) {
				return fn(block, blockElem);
			}
		});
	}