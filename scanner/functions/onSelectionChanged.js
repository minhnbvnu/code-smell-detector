function onSelectionChanged(formatPlugin, rangeObject) {
		var effectiveMarkup,
		    foundMultiSplit, i, j, multiSplitItem;

		jQuery.each(formatPlugin.buttons, function (index, button) {
			var statusWasSet = false;
			var nodeNames = interchangeableNodeNames[button.markup[0].nodeName] || [button.markup[0].nodeName];
			for (i = 0; i < rangeObject.markupEffectiveAtStart.length; i++) {
				effectiveMarkup = rangeObject.markupEffectiveAtStart[i];
				for (j = 0; j < nodeNames.length; j++) {
					if (Selection.standardTextLevelSemanticsComparator(effectiveMarkup, jQuery('<' + nodeNames[j] + '>'))) {
						button.handle.setState(true);
						statusWasSet = true;
					}
				}
			}
			if (!statusWasSet) {
				button.handle.setState(false);
			}
		});

		if (formatPlugin.multiSplitItems.length > 0) {
			foundMultiSplit = false;

			// iterate over the markup elements
			for (i = 0; i < rangeObject.markupEffectiveAtStart.length && !foundMultiSplit; i++) {
				effectiveMarkup = rangeObject.markupEffectiveAtStart[i];

				for (j = 0; j < formatPlugin.multiSplitItems.length && !foundMultiSplit; j++) {
					multiSplitItem = formatPlugin.multiSplitItems[j];

					if (!multiSplitItem.markup) {
						continue;
					}

					// now check whether one of the multiSplitItems fits to the effective markup
					if (Selection.standardTextLevelSemanticsComparator(effectiveMarkup, multiSplitItem.markup)) {
						formatPlugin.multiSplitButton.setActiveItem(multiSplitItem.name);
						foundMultiSplit = true;
					}
				}
			}

			if (!foundMultiSplit) {
				formatPlugin.multiSplitButton.setActiveItem(null);
			}
		}

		handlePreformattedText(rangeObject.commonAncestorContainer);
	}