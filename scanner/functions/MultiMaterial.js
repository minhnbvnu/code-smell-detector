function MultiMaterial( materials = [] ) {

	console.warn( 'THREE.MultiMaterial has been removed. Use an Array instead.' );
	materials.isMultiMaterial = true;
	materials.materials = materials;
	materials.clone = function () {

		return materials.slice();

	};

	return materials;

}