function mentionContentStrategy(contentBlock, callback, contentState) {
	  contentBlock.findEntityRanges(function (character) {
	    var entityKey = character.getEntity();
	    return entityKey && contentState.getEntity(entityKey).getType() === 'mention';
	  }, callback);
	}