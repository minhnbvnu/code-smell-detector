function ParticleBasicMaterial( parameters ) {

	console.warn( 'THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.' );
	return new PointsMaterial( parameters );

}