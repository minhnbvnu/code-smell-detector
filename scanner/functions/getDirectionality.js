function getDirectionality(element) {
		// "If the element's dir attribute is in the ltr state
		//     The directionality of the element is 'ltr'."
		if (element.dir == "ltr") {
			return "ltr";
		}

		// "If the element's dir attribute is in the rtl state
		//     The directionality of the element is 'rtl'."
		if (element.dir == "rtl") {
			return "rtl";
		}

		// "If the element's dir attribute is in the auto state
		// "If the element is a bdi element and the dir attribute is not in a
		// defined state (i.e. it is not present or has an invalid value)
		//     [lots of complicated stuff]
		//
		// Skip this, since no browser implements it anyway.

		// "If the element is a root element and the dir attribute is not in a
		// defined state (i.e. it is not present or has an invalid value)
		//     The directionality of the element is 'ltr'."
		if (!isAnyHtmlElement(element.parentNode)) {
			return "ltr";
		}

		// "If the element has a parent element and the dir attribute is not in a
		// defined state (i.e. it is not present or has an invalid value)
		//     The directionality of the element is the same as the element's
		//     parent element's directionality."
		return getDirectionality(element.parentNode);
	}