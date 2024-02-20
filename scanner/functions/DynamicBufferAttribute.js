function DynamicBufferAttribute( array, itemSize ) {

	console.warn( 'THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setUsage( THREE.DynamicDrawUsage ) instead.' );
	return new BufferAttribute( array, itemSize ).setUsage( DynamicDrawUsage );

}