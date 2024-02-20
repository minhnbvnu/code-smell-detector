function DataTexture3D( data, width, height, depth ) {

	console.warn( 'THREE.DataTexture3D has been renamed to Data3DTexture.' );
	return new Data3DTexture( data, width, height, depth );

}