function filterKey(entityMap, entityKey) {
	  if (entityKey) {
	    var entity = entityMap.__get(entityKey);
	    return entity.getMutability() === 'MUTABLE' ? entityKey : null;
	  }
	  return null;
	}