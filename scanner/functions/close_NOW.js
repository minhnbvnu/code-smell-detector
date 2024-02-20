function close_NOW () {
			if (s.isClosed) // skip 'close' if already closed!
				bindStopSlidingEvents(pane, false); // UNBIND trigger events - TODO: is this needed here?
			else if (!s.isMoving)
				close(pane); // close will handle unbinding
		}