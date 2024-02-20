function initSVG(svg, width, height) {
		if (svg == null) {
			svg = newEl('svg', SVG_NS);
			var defs = newEl('defs', SVG_NS);
			svg.appendChild(defs);
		}
		//IE throws an exception if this is set and Chrome requires it to be set
		if (svg.webkitMatchesSelector) {
			svg.setAttribute('xmlns', SVG_NS);
		}

		setAttr(svg, {
			'width': width,
			'height': height,
			'viewBox': '0 0 ' + width + ' ' + height,
			'preserveAspectRatio': 'none'
		});
		return svg;
	}