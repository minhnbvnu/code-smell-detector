function getEntityRemovalRange(entityMap, block, selectionState, direction, entityKey, isEntireSelectionWithinEntity, isEntityAtStart) {
	  var start = selectionState.getStartOffset();
	  var end = selectionState.getEndOffset();
	  var entity = entityMap.__get(entityKey);
	  var mutability = entity.getMutability();
	  var sideToConsider = isEntityAtStart ? start : end;

	  // `MUTABLE` entities can just have the specified range of text removed
	  // directly. No adjustments are needed.
	  if (mutability === 'MUTABLE') {
	    return selectionState;
	  }

	  // Find the entity range that overlaps with our removal range.
	  var entityRanges = getRangesForDraftEntity(block, entityKey).filter(function (range) {
	    return sideToConsider <= range.end && sideToConsider >= range.start;
	  });

	  !(entityRanges.length == 1) ?  true ? invariant(false, 'There should only be one entity range within this removal range.') : invariant(false) : void 0;

	  var entityRange = entityRanges[0];

	  // For `IMMUTABLE` entity types, we will remove the entire entity range.
	  if (mutability === 'IMMUTABLE') {
	    return selectionState.merge({
	      anchorOffset: entityRange.start,
	      focusOffset: entityRange.end,
	      isBackward: false
	    });
	  }

	  // For `SEGMENTED` entity types, determine the appropriate segment to
	  // remove.
	  if (!isEntireSelectionWithinEntity) {
	    if (isEntityAtStart) {
	      end = entityRange.end;
	    } else {
	      start = entityRange.start;
	    }
	  }

	  var removalRange = DraftEntitySegments.getRemovalRange(start, end, block.getText().slice(entityRange.start, entityRange.end), entityRange.start, direction);

	  return selectionState.merge({
	    anchorOffset: removalRange.start,
	    focusOffset: removalRange.end,
	    isBackward: false
	  });
	}