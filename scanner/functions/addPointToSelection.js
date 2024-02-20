function addPointToSelection(selection, node, offset, selectionState) {
	  var range = document.createRange();
	  // logging to catch bug that is being reported in t16250795
	  if (offset > getNodeLength(node)) {
	    // in this case we know that the call to 'range.setStart' is about to throw
	    DraftJsDebugLogging.logSelectionStateFailure({
	      anonymizedDom: getAnonymizedEditorDOM(node),
	      extraParams: JSON.stringify({ offset: offset }),
	      selectionState: JSON.stringify(selectionState.toJS())
	    });
	  }
	  range.setStart(node, offset);
	  selection.addRange(range);
	}