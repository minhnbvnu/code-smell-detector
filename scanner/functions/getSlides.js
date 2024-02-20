function getSlides() {

		return toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ':not(.stack)' ));

	}