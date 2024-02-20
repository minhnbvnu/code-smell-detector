function getTypedArray( type, buffer ) {

	return new TYPED_ARRAYS[ type ]( buffer );

}