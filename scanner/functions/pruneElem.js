function pruneElem(elem, emap) {
		var className = elem.className;
		// Because SVG elements will (sometimes) hold a SVGAnimatedString object
		// (http://mdn.beonex.com/en/DOM/SVGStylable.html#Properties) instead of
		// a string for the className property
		if ('string' === typeof className && -1 !== className.indexOf(commonClsSubstr)) {
			var classes = Strings.words(className);

			// Ephemera.markElement()
			if (-1 !== Arrays.indexOf(classes, 'aloha-cleanme') || -1 !== Arrays.indexOf(classes, 'aloha-ephemera')) {
				$.removeData(elem); // avoids memory leak
				return false; // removes the element
			}

			// Ephemera.markWrapper() and Ephemera.markFiller()
			if (-1 !== Arrays.indexOf(classes, 'aloha-ephemera-wrapper') || -1 !== Arrays.indexOf(classes, 'aloha-ephemera-filler')) {
				Dom.moveNextAll(elem.parentNode, elem.firstChild, elem.nextSibling);
				$.removeData(elem);
				return false;
			}

			// Ephemera.markWhiteSpaceWrapper() and Ephemera.markFiller()
			if (-1 !== Arrays.indexOf(classes, 'aloha-ephemera-empty-wrapper')) {
				if (!Html.hasOnlyWhiteSpaceChildren(elem)) {
					Dom.moveNextAll(elem.parentNode, elem.firstChild, elem.nextSibling);
				}
				$.removeData(elem);
				return false;
			}

			// Ephemera.markAttr()
			if (-1 !== Arrays.indexOf(classes, 'aloha-ephemera-attr')) {
				pruneMarkedAttrs(elem);
			}

			// Ephemera.classes() and Ehpemera.ephemera({ classMap: {} })
			var persistentClasses = Arrays.filter(classes, function (cls) {
				return !emap.classMap[cls];
			});
			if (persistentClasses.length !== classes.length) {
				if (0 === persistentClasses.length) {
					// Removing the attributes is dangerous. Aloha has a
					// jquery patch in place to fix some issue.
					$(elem).removeAttr('class');
				} else {
					elem.className = persistentClasses.join(' ');
				}
			}
		}

		// Ephemera.attributes() and Ephemera.ephemera({ attrMap: {}, attrRxs: {} })
		pruneEmapAttrs(elem, emap);

		return true;
	}