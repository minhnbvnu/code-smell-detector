function pasteElement(object) {
				var $object = jQuery(object),
					contents;

				// try to insert the element into the DOM with limit the editable host
				// this fails when an element is not allowed to be inserted
				if (!dom.insertIntoDOM($object, range, $editable, false)) {
					
					// if that is not possible, we unwrap the content and insert every child element
					contents = $object.contents();

					// when a block level element was unwrapped, we at least insert a break
					if (dom.isBlockLevelElement(object) || dom.isListElement(object)) {
						pasteElement(jQuery('<br/>').get(0));
					}

					// and now all children (starting from the back)
					for (var i = contents.length - 1; i >= 0; --i) {
						pasteElement(contents[i]);
					}
				}
			}