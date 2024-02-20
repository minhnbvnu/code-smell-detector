function removeForBlock(entityMap, block, offset) {
	  var chars = block.getCharacterList();
	  var charBefore = offset > 0 ? chars.get(offset - 1) : undefined;
	  var charAfter = offset < chars.count() ? chars.get(offset) : undefined;
	  var entityBeforeCursor = charBefore ? charBefore.getEntity() : undefined;
	  var entityAfterCursor = charAfter ? charAfter.getEntity() : undefined;

	  if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
	    var entity = entityMap.__get(entityAfterCursor);
	    if (entity.getMutability() !== 'MUTABLE') {
	      var _getRemovalRange = getRemovalRange(chars, entityAfterCursor, offset),
	          start = _getRemovalRange.start,
	          end = _getRemovalRange.end;

	      var current;
	      while (start < end) {
	        current = chars.get(start);
	        chars = chars.set(start, CharacterMetadata.applyEntity(current, null));
	        start++;
	      }
	      return block.set('characterList', chars);
	    }
	  }

	  return block;
	}