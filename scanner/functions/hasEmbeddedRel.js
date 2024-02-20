function hasEmbeddedRel (entity, rel) {
		return entity._embedded && entity._embedded.hasOwnProperty(rel);
	}