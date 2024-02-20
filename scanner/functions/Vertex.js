function Vertex( x, y, z ) {

	console.warn( 'THREE.Vertex has been removed. Use THREE.Vector3 instead.' );
	return new Vector3( x, y, z );

}