function validateTypeEvent( value, name ) {
		validateType( value, name, typeof value === "string" || value instanceof RegExp, "String or RegExp" );
	}