function handleKeyUpEventOnField(e) {

				// Load the max/min from the data properties of this event
				var minValue = e.data.minValue;
				var maxValue = e.data.maxValue;
				var fieldName = e.data.fieldName;

				// Allow backspace and delete
				if (e.keyCode === 8 || e.keyCode === 46) {

					// Only resize if field values are ok
					if (plugin._updateFields(fieldName, $(this).val(), false)) {
						// Check if we are currently in cropping mode
						if (typeof plugin.jcAPI !== 'undefined' && plugin.jcAPI !== null) {
							plugin.setCropAreaByFieldValue();
						} else {
							plugin.setSizeByFieldValue();
						}
					}
					// 0-9 keys
				} else if (e.keyCode <= 57 && e.keyCode >= 48 || e.keyCode <= 105 && e.keyCode >= 96) {

					// Only resize if field values are ok
					if (plugin._updateFields(fieldName, $(this).val(), false)) {
						// Check if we are currently in cropping mode
						if (typeof plugin.jcAPI !== 'undefined' && plugin.jcAPI !== null) {
							plugin.setCropAreaByFieldValue();
						} else {
							plugin.setSizeByFieldValue();
						}
					}
				} else {
					var delta = 0;
					if (e.keyCode === 38 || e.keyCode === 107) {
						delta = +1;
					} else if (e.keyCode === 40 || e.keyCode === 109) {
						delta = -1;
					}
					// Handle key combinations
					if (e.shiftKey || e.metaKey || e.ctrlKey) {
						delta = delta * 10;
					}

					var isDecrement = false;
					if (delta < 0) {
						isDecrement = true;
					}
					var newValue = parseInt($(this).val(), 10) + delta;

					// Only resize if field values are ok
					if (plugin._updateFields(fieldName, newValue, isDecrement)) {
						// Check if we are currently in cropping mode
						if (typeof plugin.jcAPI !== 'undefined' && plugin.jcAPI !== null) {
							plugin.setCropAreaByFieldValue();
						} else {
							plugin.setSizeByFieldValue();
						}
					}
				}

				e.preventDefault();
				return false;
			}