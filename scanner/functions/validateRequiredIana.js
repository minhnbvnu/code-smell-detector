function validateRequiredIana( timeZone ) {
	return function( path, value ) {

		if ( !/globalize-iana/.test( path ) ) {
			return;
		}

		validate(
			"E_MISSING_IANA_TZ",
			"Missing required IANA timezone content for `{timeZone}`: `{path}`.",
			value,
			{
				path: path.replace( /globalize-iana\//, "" ),
				timeZone: timeZone
			}
		);
	};
}