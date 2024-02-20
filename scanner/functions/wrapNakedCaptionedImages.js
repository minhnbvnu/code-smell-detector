function wrapNakedCaptionedImages($editable) {
		var selector = settings.selector || 'img.aloha-captioned-image';
		var $imgs = $editable.find(selector);
		var j = $imgs.length;

		while (j--) {
			var $img = $imgs.eq(j);
			var $block = $img.removeClass(settings.captionedImageClass)
							 .wrap('<div class="aloha-captioned-image-block">')
							 .parent();

			// Set user-provided block class, if any.
			if (typeof settings.blockClass === 'string') {
				$block.addClass(settings.blockClass);
			}

			// Through this plug-in, users will be able to change the caption
			// and the alignment, so we only need to grab those two attributes,
			// as well as the original image. We'll then always manipulate the
			// original image, to make sure we don't accidentally erase other
			// attributes.
			// Whenever we need to use other attributes, we'll have to retrieve
			// it from the original image.
			var caption = $img.attr('data-caption');
			var align = $img.attr('data-align');
			caption = (typeof caption !== 'undefined') ? caption : '';
			align = (typeof align !== 'undefined') ? align : false;
			$block.attr('data-caption',        caption)
			      .attr('data-align',          align)
			      .attr('data-width',          getImageWidth($img))
			      .attr('data-original-image', $img[0].outerHTML);
		}

		return $editable.find('.aloha-captioned-image-block');
	}