function pruneDefaultComponents(form) {
			return 'array' === $.type(form) ? !form.length : exclusionLookup[form];
		}