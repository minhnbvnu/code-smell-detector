function ParticleSystem( geometry, material ) {

	console.warn( 'THREE.ParticleSystem has been renamed to THREE.Points.' );
	return new Points( geometry, material );

}