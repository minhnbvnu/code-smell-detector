function fixBoundaryPoint(container, offset, range, set) {
		// Because Chrome doesn't like it if a boundary point is at the
		// outside of an editable. The effect would be, if such a range
		// were added to the selection, that the selection would be
		// collapsed to the end of the range.
		if (Html.isEditingHost(Dom.nodeAtOffset(container, offset))) {
			set.call(range, Dom.nodeAtOffset(container, offset), 0);
		}
	}