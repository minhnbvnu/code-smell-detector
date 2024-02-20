function open_2 () {
			s.isMoving	= false;

			// cure iframe display issues
			_fixIframe(pane);

			// NOTE: if isSliding, then other panes are NOT 'resized'
			if (!s.isSliding) { // resize all panes adjacent to this one
				sizeMidPanes(_c[pane].dir=="vert" ? "center" : "", false); // false = NOT skipCallback
			}

			// set classes, position handles and execute callbacks...
			setAsOpen(pane);
		}