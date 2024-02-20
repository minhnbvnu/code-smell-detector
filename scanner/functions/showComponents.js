function showComponents() {
		var i;
		for (i = 0; i < components.length; i++) {
			components[i].visible = false; // Force the component to be shown.
			components[i].show();
			components[i].foreground();
		}

		if (!Aloha.activeEditable || !BlockManager._activeBlock) {
			return;
		}

		for (i = 0; i < components.length; i++) {
			components[i].setState(false);
		}

		var alignment = BlockManager._activeBlock.attr('align');
		var component = getAlignmentButton(alignment);

		if (component) {
			component.setState(true);
		}
	}