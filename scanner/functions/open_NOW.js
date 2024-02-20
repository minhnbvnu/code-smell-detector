function open_NOW () {
			if (!s.isClosed) // skip if no longer closed!
				bindStopSlidingEvents(pane, true); // BIND trigger events to close sliding-pane
			else if (!s.isMoving)
				open(pane, true); // true = slide - open() will handle binding
		}