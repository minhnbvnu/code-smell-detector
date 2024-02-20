function getCharacterRemovalRange(entityMap, startBlock, endBlock, selectionState, direction) {
	  var start = selectionState.getStartOffset();
	  var end = selectionState.getEndOffset();
	  var startEntityKey = startBlock.getEntityAt(start);
	  var endEntityKey = endBlock.getEntityAt(end - 1);
	  if (!startEntityKey && !endEntityKey) {
	    return selectionState;
	  }
	  var newSelectionState = selectionState;
	  if (startEntityKey && startEntityKey === endEntityKey) {
	    newSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, true, true);
	  } else if (startEntityKey && endEntityKey) {
	    var startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
	    var endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
	    newSelectionState = newSelectionState.merge({
	      anchorOffset: startSelectionState.getAnchorOffset(),
	      focusOffset: endSelectionState.getFocusOffset(),
	      isBackward: false
	    });
	  } else if (startEntityKey) {
	    var _startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
	    newSelectionState = newSelectionState.merge({
	      anchorOffset: _startSelectionState.getStartOffset(),
	      isBackward: false
	    });
	  } else if (endEntityKey) {
	    var _endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
	    newSelectionState = newSelectionState.merge({
	      focusOffset: _endSelectionState.getEndOffset(),
	      isBackward: false
	    });
	  }
	  return newSelectionState;
	}