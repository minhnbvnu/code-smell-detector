function cancelMouseOut (evt) {
			timer.clear(pane+"_closeSlider");
			evt.stopPropagation();
		}