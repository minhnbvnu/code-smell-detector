function setExtremes(newMin, newMax, redraw, animation, eventArguments) {

			redraw = pick(redraw, true); // defaults to true
			
			// Extend the arguments with min and max
			eventArguments = extend(eventArguments, {
				min: newMin,
				max: newMax
			});

			// Fire the event
			fireEvent(axis, 'setExtremes', eventArguments, function () { // the default event handler

				userMin = newMin;
				userMax = newMax;
				
				// Mark for running afterSetExtremes
				axis.isDirtyExtremes = true;
				
				// redraw
				if (redraw) {
					chart.redraw(animation);
				}
			});
		}