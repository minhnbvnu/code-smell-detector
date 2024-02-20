function onSelectCharacter(character) {
		if (Aloha.activeEditable) {
			rangeAtOpen.select();
			Aloha.execCommand('insertHTML', false, character);

			// Because after the character was inserted, move the selection
			// forward.
			rangeAtOpen.endContainer = rangeAtOpen.startContainer;
			rangeAtOpen.endOffset = ++rangeAtOpen.startOffset;
			rangeAtOpen.select();
		}
	}