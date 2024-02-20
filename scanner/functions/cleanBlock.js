function cleanBlock(block, blockElem) {
		var $img = block.$_image.clone();
		var caption = block.attr('caption');
		var align = block.attr('align');

		// We only touch the data-caption and data-align attributes o/t img!
		if (caption) {
			$img.attr('data-caption', caption);
		} else {
			$img.removeAttr('data-caption');
		}

		if (align) {
			$img.attr('data-align', align);
		} else {
			$img.removeAttr('data-align');
		}

		if (settings.captionedImageClass) {
			$img.addClass(settings.captionedImageClass);
		}

		// Now replace the entire block with the original image, with
		// potentially updated data-caption, data-align and class
		// attributes.
		$(blockElem).replaceWith($img);
	}