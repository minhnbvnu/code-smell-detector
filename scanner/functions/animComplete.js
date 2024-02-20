function animComplete() {
		element.css( {
			visibility: "visible"
		} );
		$( pieces ).remove();
		done();
	}