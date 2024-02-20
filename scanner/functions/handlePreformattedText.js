function handlePreformattedText(element) {
		var $element = jQuery(element);

		if ($element.is('.aloha-editing-p.aloha-placeholder')) {
			//remove all other placeholders
			$element[0].className = '';
			removePlaceholders();
			$element[0].className = 'aloha-editing-p aloha-placeholder';
			return;
		}

		removePlaceholders();

		if ($element.is('pre')) {
			//add placeholder before and after the preformatted text element
			var nextSibling = $element[0].nextSibling;
			var previousSibling = $element[0].previousSibling;
			if (!previousSibling || !nextSibling) {
				if (!previousSibling) {
					$element.before(createLanding());
				}
				if (!nextSibling) {
					$element.after(createLanding());
				}
			}
		}
	}