function startSplitMouse(evt) {
			if ( opts.outline )
				zombie = zombie || bar.clone(false).insertAfter(A);
			panes.css("-webkit-user-select", "none");	// Safari selects A/B text on a move
			bar.addClass(opts.activeClass);
			A._posSplit = A[0][opts.pxSplit] - evt[opts.eventPos];
			$(document)
				.bind("mousemove", doSplitMouse)
				.bind("mouseup", endSplitMouse);
		}