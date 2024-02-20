function decimals( number ) {
		const parts = number.toString().split( '.' );
		return parts.length === 1 ? 0 : parts[ 1 ].length;
	}