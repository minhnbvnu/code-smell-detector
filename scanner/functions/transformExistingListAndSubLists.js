function transformExistingListAndSubLists (domToTransform, transformTo) {
		// find and transform sublists if they are in the selection
		jQuery(domToTransform).find(domToTransform.nodeName).each(function () {
			if (isListInSelection(this)) {
				Aloha.Markup.transformDomObject(this, transformTo, Aloha.Selection.rangeObject);
			}
		});

		// the element itself
		Aloha.Markup.transformDomObject(domToTransform, transformTo, Aloha.Selection.rangeObject);
	}