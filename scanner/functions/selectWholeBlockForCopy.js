function selectWholeBlockForCopy(block) {
		block.$element.attr('data-aloha-block-copy-only-block', 'true');
		GENTICS.Utils.Dom.selectDomNode(block.$element[0]);
	}