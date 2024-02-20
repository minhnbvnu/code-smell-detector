function getEntityContent(contentState, entityKey, content) {
	    if (entityKey) {
	        var entity = contentState.getEntity(entityKey);
	        var entityData = entity.getData();
	        if (entityData && entityData["export"]) {
	            return entityData["export"](content, entityData);
	        }
	    }
	    return content;
	}