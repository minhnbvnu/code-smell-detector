function makeIsEditableElementInSameEditingHostDoesNotContainProhibitedParagraphChildren(node) {
				return function (ancestor) {
					return (isEditable(ancestor)
							&& inSameEditingHost(ancestor, node)
							&& isHtmlElement_obsolete(ancestor, formattableBlockNames)
							&& !$_(getDescendants(ancestor)).some(isProhibitedParagraphChild));
				};
			}