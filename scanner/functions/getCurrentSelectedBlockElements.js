function getCurrentSelectedBlockElements() {
		var range = Aloha.Selection.getRangeObject();
		var selection = range.getRangeTree(),
			cac = range.getCommonAncestorContainer(),
			elements = [];
		var cells, i, len;

		jQuery.each(selection, function () {
			var node = this.domobj;
			if (this.type === 'none' || !node) {
				return;
			}
			if (Html.isBlock(node)) {
				elements.push(node);
				return;
			}
			// Because the align-text property needs to be set on a block-level
			// element in order for it to have visual effect
			while (node && !Html.isBlock(node)) {
				if ((Html.isBlock(cac) && cac === node.parentNode) ||
					DomLegacy.isEditingHost(node.parentNode)) {
					break;
				}
				node = node.parentNode;
			}
			if (Html.isBlock(node)) {
				elements.push(node);
			}
		});

		if (elements.length === 0 && selection.length > 0 && Html.isBlock(cac) && !DomLegacy.isEditingHost(cac)) {
			elements.push(cac);
		}

		if (AlignTableUtils.isInsideTable(cac)) {
			elements = AlignTableUtils.getSelectedTableCells(cac, elements);
		}
		return elements;
	}