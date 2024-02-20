function get_defaultopacity() {
					var defaultopacity = (settings.mouseover_ui_opacity / 100);
					if (isNaN(defaultopacity))
						defaultopacity = 1;
					if (defaultopacity > 1)
						defaultopacity = 1;
					if (defaultopacity < 0)
						defaultopacity = 0;
					return defaultopacity;
				}