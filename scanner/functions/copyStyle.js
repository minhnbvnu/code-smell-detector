function copyStyle(source, $target, styleProp) {
		// TODO: Move to strings.js
		var camelize = function (str) {
			return str.replace(/\-(\w)/g, function (str, letter) {
				return letter.toUpperCase();
			});
		};

		var style;

		if (source.currentStyle) {
			style = source.currentStyle[camelize(styleProp)];
		} else if (document.defaultView &&
			document.defaultView.getComputedStyle) {
			style = document.defaultView
			                .getComputedStyle(source, null)
			                .getPropertyValue(styleProp);
		} else {
			style = source.style[camelize(styleProp)];
		}

		if (style) {
			$target.css(styleProp, style);
		}
	}