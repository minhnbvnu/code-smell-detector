function setOpacity( value ) {

		if ( _contextGlobalAlpha !== value ) {

			_context.globalAlpha = value;
			_contextGlobalAlpha = value;

		}

	}