function finishEditing() {
			restoreTargetBackground();

			if (!targetObject || lastAttributeValue === $(targetObject).attr(targetAttribute)) {
				return;
			}

			// when no resource item was selected, remove any marking of the target object
			if (!resourceItem) {
				RepositoryManager.markObject( targetObject );
			}

			if (getValue() === '') {
				setPlaceholder();
			}
		}