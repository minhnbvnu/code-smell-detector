function styleIsApplied () {
		// Chrome 8 hax0rs!
		// This is an ugly hack needed by Chrome 8+ which no longer waits for rules
		// to be applied to the document before exposing them to javascript.
		// Unfortunately, this routine will never fire for XD stylesheets since
		// Chrome will also throw an exception if attempting to access the rules
		// of an XD stylesheet.  Therefore, there's no way to detect the load
		// event of XD stylesheets until Google fixes this, preferably with a
		// functional load event!  As a work-around, use domReady() before
		// rendering widgets / components that need the css to be ready.
		if (!testEl) {
				testEl = doc[createElement]('div');
			testEl.id = '_cssx_load_test';
			head.appendChild(testEl);
		}
		return doc.defaultView.getComputedStyle(testEl, null).marginTop == '-5px';
	}