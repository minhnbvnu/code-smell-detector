function getObjectMaterial( object ) {

		return object.material instanceof THREE.MeshFaceMaterial
			? object.material.materials[ 0 ]
			: object.material;

	}