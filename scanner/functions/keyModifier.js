function keyModifier($event) {
		return $event.altKey ? 'alt' :
					$event.ctrlKey ? 'ctrl' :
						$event.shiftKey ? 'shift' : null;
	}