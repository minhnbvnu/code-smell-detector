function selectionChangeHandler(that, rangeObject) {
		var foundMarkup,
		    enteredLinkScope = false;

		// Check if we need to ignore this selection changed event for
		// now and check whether the selection was placed within a
		// editable area.
		if (!that.ignoreNextSelectionChangedEvent &&
			Aloha.Selection.isSelectionEditable() &&
			Aloha.activeEditable != null ) {
			
			foundMarkup = that.findLinkMarkup(rangeObject);

			if (foundMarkup) {
				that.toggleLinkScope(true);

				// now we are ready to set the target object
				that.hrefField.setTargetObject(foundMarkup, 'href');
				addAdditionalTargetObject(rangeObject, that.hrefField);
				// if the selection-changed event was raised by the first click interaction on this page
				// the hrefField component might not be initialized. When the user switches to the link
				// tab to edit the link the field would be empty. We check for that situation and add a
				// special interval check to set the value once again
				if (jQuery('#' + that.hrefField.getInputId()).length == 0) {
					// there must only be one update interval running at the same time
					if (that.hrefUpdateInt !== null) {
						clearInterval(that.hrefUpdateInt);
					}
					
					// register a timeout that will set the value as soon as the href field was initialized
					that.hrefUpdateInt = setInterval( function () {
						if (jQuery( '#' + that.hrefField.getInputId()).length > 0) { // the object was finally created
							that.hrefField.setTargetObject(foundMarkup, 'href');
							clearInterval(that.hrefUpdateInt);
						}
					}, 200);
				}
				Aloha.trigger('aloha-link-selected');
				enteredLinkScope = true;

				PubSub.pub('aloha.link.selected', {
					input: that.hrefField.getInputElem(),
					href: that.hrefField.getValue(),
					element: that.hrefField.getTargetObject()
				});
			} else {
				that.toggleLinkScope(false);
				that.hrefField.setTargetObject(null);
				Aloha.trigger('aloha-link-unselected');
			}
		} else {
			that.toggleLinkScope(false);
		}
		
		that.ignoreNextSelectionChangedEvent = false;
		return enteredLinkScope;
	}