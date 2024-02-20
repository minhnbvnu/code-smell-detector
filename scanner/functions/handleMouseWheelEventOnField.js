function handleMouseWheelEventOnField(e, delta) {
				var minValue = e.data.minValue;
				var maxValue = e.data.maxValue;
				var fieldName = e.data.fieldName;

				// Handle key combinations
				if (e.shiftKey || e.metaKey || e.ctrlKey) {
					delta = delta * 10;
				}

				var newValue = parseInt($(this).val(), 10) + delta;
				var decrement = false;
				if (delta < 0) {
					decrement = true;
				}

				// Only resize if field values are ok
				if (plugin._updateFields(fieldName, newValue, decrement)) {
					// Check if we are currently in cropping mode
					if (typeof plugin.jcAPI !== 'undefined' && plugin.jcAPI !== null) {
						plugin.setCropAreaByFieldValue();
					} else {
						plugin.setSizeByFieldValue();
					}
				}
				return false;
			}