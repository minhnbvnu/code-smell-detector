function ParticleSystemMaterial( parameters ) {

	console.warn( 'THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.' );
	return new PointsMaterial( parameters );

}