function isNestedTable ($hovering, $dragging) {
		return $hovering
			&& $dragging
			&& $hovering.parents('table').length !== 0
			&& BlockUtils.isTable($dragging);
	}