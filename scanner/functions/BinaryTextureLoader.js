function BinaryTextureLoader( manager ) {

	console.warn( 'THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.' );
	return new DataTextureLoader( manager );

}