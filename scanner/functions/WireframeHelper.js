function WireframeHelper( object, hex ) {

	console.warn( 'THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.' );
	return new LineSegments( new WireframeGeometry( object.geometry ), new LineBasicMaterial( { color: hex !== undefined ? hex : 0xffffff } ) );

}