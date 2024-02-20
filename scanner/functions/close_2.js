function close_2 () {
			s.isMoving	= false;
			bindStartSlidingEvents(pane, true); // will enable if o.slidable = true

			// if opposite-pane was autoClosed, see if it can be autoOpened now
			var altPane = _c.oppositeEdge[pane];
			if (state[ altPane ].noRoom) {
				setSizeLimits( altPane );
				makePaneFit( altPane );
			}

			if (!skipCallback && (state.initialized || o.triggerEventsOnLoad)) {
				// onclose callback - UNLESS just 'showing' a hidden pane as 'closed'
				if (!isShowing)	_runCallbacks("onclose_end", pane);
				// onhide OR onshow callback
				if (isShowing)	_runCallbacks("onshow_end", pane);
				if (isHiding)	_runCallbacks("onhide_end", pane);
			}
		}