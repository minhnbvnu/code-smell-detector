function getUnit(unit) {
			if (unit.match(/^ *([0-9]+)px *$/)) {
				return unit.replace(/^ *([0-9]+)px *$/, "$1");
			}
			if (getunit_cache.has(unit)) {
				return getunit_cache.get(unit);
			}
			// Based on https://github.com/tysonmatanich/getEmPixels/blob/master/getEmPixels.js
			// /*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
			var important = "!important;";
			var style = "position:absolute!important;visibility:hidden!important;width:" + unit + "!important;font-size:" + unit + "!important;padding:0!important";
			var extraBody;
			var unitel = document.body;
			if (!unitel) {
				// Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
				unitel = extraBody = document_createElement("body");
				extraBody.style.cssText = "font-size:" + unit + "!important;";
				document.documentElement.insertBefore(extraBody, document.body);
			}
			// Create and style a test element
			if (!getunit_el) {
				getunit_el = document_createElement("i");
				set_el_all_initial(getunit_el);
				set_important_style(getunit_el, "position", "absolute");
				set_important_style(getunit_el, "visibility", "hidden");
				set_important_style(getunit_el, "padding", "0");
			}
			set_important_style(getunit_el, "width", unit);
			set_important_style(getunit_el, "font-size", unit);
			//getunit_el.style.cssText = style;
			unitel.appendChild(getunit_el);
			// Get the client width of the test element
			var value = getunit_el.clientWidth;
			getunit_cache.set(unit, value, 5 * 60);
			if (extraBody) {
				// Remove the extra body element
				document.documentElement.removeChild(extraBody);
			} else {
				// Remove the test element
				unitel.removeChild(getunit_el);
			}
			// Return the em value in pixels
			return value;
		}