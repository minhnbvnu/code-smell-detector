function updateTarget() {
			// If this attribute field currently refers to a repository
			// item, and the user edits the contents of the input field,
			// this attribute field seizes to refer to the repository item.
			if (resourceItem && resourceValue !== getValue()) {
				resourceItem = null;
				resourceValue = null;
			}

			// This handles attribute updates for non-repository, literal urls typed into the input field.
			// Input values that refer to a repository item are handled via setItem().
			if ( ! resourceItem ) {
				setAttribute(targetAttribute, getValue());
			}
		}