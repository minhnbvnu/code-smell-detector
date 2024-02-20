function DataTexture2DArray( data, width, height, depth ) {

	console.warn( 'THREE.DataTexture2DArray has been renamed to DataArrayTexture.' );
	return new DataArrayTexture( data, width, height, depth );

}