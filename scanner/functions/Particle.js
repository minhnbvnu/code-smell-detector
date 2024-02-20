function Particle( material ) {

	console.warn( 'THREE.Particle has been renamed to THREE.Sprite.' );
	return new Sprite( material );

}