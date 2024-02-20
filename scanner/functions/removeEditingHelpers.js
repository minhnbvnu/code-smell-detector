function removeEditingHelpers($field) {
		// remove the editing br's
		$field.find('p.aloha-editing-p > br.aloha-end-br').remove();

		$field.find('p.aloha-editing-p').each(function (index, elem) {
			if (Dom.isEmpty(elem) &&
				// blocks may remain empty until the user fills them with content
					!jQuery(elem).find('.aloha-block').length) {
				jQuery(elem).remove();
			} else {
				// if the p shall remain, we remove the class aloha-editing-p
				jQuery(elem).removeClass('aloha-editing-p');
				// use the Engine to add an end br, if necessary
				Engine.ensureContainerEditable(elem);
			}
		});
	}