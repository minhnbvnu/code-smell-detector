function reorderModifiableDescendants(node, command, newValue, range) {
		// "Let candidate equal node."
		var candidate = node;

		// "While candidate is a modifiable element, and candidate has exactly one
		// child, and that child is also a modifiable element, and candidate is not
		// a simple modifiable element or candidate's specified command value for
		// command is not equivalent to new value, set candidate to its child."
		while (isModifiableElement(candidate) && candidate.childNodes.length == 1 && isModifiableElement(candidate.firstChild) && (!isSimpleModifiableElement(candidate) || !areEquivalentValues(command, getSpecifiedCommandValue(candidate, command), newValue))) {
			candidate = candidate.firstChild;
		}

		// "If candidate is node, or is not a simple modifiable element, or its
		// specified command value is not equivalent to new value, or its effective
		// command value is not loosely equivalent to new value, abort these
		// steps."
		if (candidate == node || !isSimpleModifiableElement(candidate) || !areEquivalentValues(command, getSpecifiedCommandValue(candidate, command), newValue) || !areLooselyEquivalentValues(command, getEffectiveCommandValue(candidate, command), newValue)) {
			return;
		}

		// "While candidate has children, insert the first child of candidate into
		// candidate's parent immediately before candidate, preserving ranges."
		while (candidate.hasChildNodes()) {
			movePreservingRanges(candidate.firstChild, candidate.parentNode, Dom.getIndexInParent(candidate), range);
		}

		// "Insert candidate into node's parent immediately after node."
		node.parentNode.insertBefore(candidate, node.nextSibling);

		// "Append the node as the last child of candidate, preserving ranges."
		movePreservingRanges(node, candidate, -1, range);
	}