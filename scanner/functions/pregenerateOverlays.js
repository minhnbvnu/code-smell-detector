function pregenerateOverlays(editableIndex) {
				if (editableIndex < Aloha.editables.length) {
					generateOverlay(characterpicker,
							Aloha.editables[editableIndex]);
					window.setTimeout(function () {
						pregenerateOverlays(editableIndex + 1);
					}, 100);
				}
			}