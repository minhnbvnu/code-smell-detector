function allowDropRegions($hovering, $dragging) {
		return !$hovering || !(
			$hovering.is('.ui-draggable-dragging') ||
			$hovering.closest($dragging).length > 0
		);
	}