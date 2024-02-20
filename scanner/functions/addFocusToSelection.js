function addFocusToSelection(selection, node, offset, selectionState) {
	  var activeElement = getActiveElement();
	  if (selection.extend && containsNode(activeElement, node)) {
	    // If `extend` is called while another element has focus, an error is
	    // thrown. We therefore disable `extend` if the active element is somewhere
	    // other than the node we are selecting. This should only occur in Firefox,
	    // since it is the only browser to support multiple selections.
	    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444.

	    // logging to catch bug that is being reported in t16250795
	    if (offset > getNodeLength(node)) {
	      // the call to 'selection.extend' is about to throw
	      DraftJsDebugLogging.logSelectionStateFailure({
	        anonymizedDom: getAnonymizedEditorDOM(node),
	        extraParams: JSON.stringify({ offset: offset }),
	        selectionState: JSON.stringify(selectionState.toJS())
	      });
	    }

	    // logging to catch bug that is being reported in t18110632
	    var nodeWasFocus = node === selection.focusNode;
	    try {
	      selection.extend(node, offset);
	    } catch (e) {
	      DraftJsDebugLogging.logSelectionStateFailure({
	        anonymizedDom: getAnonymizedEditorDOM(node, function (n) {
	          var labels = [];
	          if (n === activeElement) {
	            labels.push('active element');
	          }
	          if (n === selection.anchorNode) {
	            labels.push('selection anchor node');
	          }
	          if (n === selection.focusNode) {
	            labels.push('selection focus node');
	          }
	          return labels;
	        }),
	        extraParams: JSON.stringify({
	          activeElementName: activeElement ? activeElement.nodeName : null,
	          nodeIsFocus: node === selection.focusNode,
	          nodeWasFocus: nodeWasFocus,
	          selectionRangeCount: selection.rangeCount,
	          selectionAnchorNodeName: selection.anchorNode ? selection.anchorNode.nodeName : null,
	          selectionAnchorOffset: selection.anchorOffset,
	          selectionFocusNodeName: selection.focusNode ? selection.focusNode.nodeName : null,
	          selectionFocusOffset: selection.focusOffset,
	          message: e ? '' + e : null,
	          offset: offset
	        }, null, 2),
	        selectionState: JSON.stringify(selectionState.toJS(), null, 2)
	      });
	      // allow the error to be thrown -
	      // better than continuing in a broken state
	      throw e;
	    }
	  } else {
	    // IE doesn't support extend. This will mean no backward selection.
	    // Extract the existing selection range and add focus to it.
	    // Additionally, clone the selection range. IE11 throws an
	    // InvalidStateError when attempting to access selection properties
	    // after the range is detached.
	    var range = selection.getRangeAt(0);
	    range.setEnd(node, offset);
	    selection.addRange(range.cloneRange());
	  }
	}