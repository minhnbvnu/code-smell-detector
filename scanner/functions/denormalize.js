function denormalize( value, array ) {

	switch ( array.constructor ) {

		case Float32Array:

			return value;

		case Uint16Array:

			return value / 65535.0;

		case Uint8Array:

			return value / 255.0;

		case Int16Array:

			return Math.max( value / 32767.0, - 1.0 );

		case Int8Array:

			return Math.max( value / 127.0, - 1.0 );

		default:

			throw new Error( 'Invalid component type.' );

	}

}