function convertArrayBufferToString( buffer, from, to ) {

		if ( from === undefined ) from = 0;
		if ( to === undefined ) to = buffer.byteLength;

		return THREE.LoaderUtils.decodeText( new Uint8Array( buffer, from, to ) );

	}