function resetifout(e) {
			// doesn't work, as e doesn't contain ctrlKey etc.
			if (!trigger_complete(settings.mouseover_trigger_key)) {
				//current_chord = [];
				stop_waiting();
				resetpopups();
			}
		}