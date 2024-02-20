function get_el_dimensions(el) {
			var el_tagname = get_tagname(el);
			if (el_tagname === "VIDEO") {
				return [
					el.videoWidth,
					el.videoHeight
				];
			} else if (el_tagname === "CANVAS") {
				return [
					el.width,
					el.height
				];
			} else if (el_tagname === "SVG") {
				return [
					el.width.animVal.value,
					el.height.animVal.value
				];
			} else if (el_tagname === "IMG") {
				var dims = get_image_dims(el);
				return [
					dims.width,
					dims.height
				];
			} else if (el_tagname === "IMG" || el_tagname === "PICTURE") {
				return [
					el.naturalWidth,
					el.naturalHeight
				];
			} else { // e.g. <audio>
				return [
					// .style. is a hack in order to get the dimensions before the element is created
					el.offsetWidth || getUnit(el.style.width),
					el.offsetHeight || getUnit(el.style.height)
				];
			}
		}