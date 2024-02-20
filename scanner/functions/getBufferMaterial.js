function getBufferMaterial( object, geometryGroup ) {

		return object.material instanceof THREE.MeshFaceMaterial
			 ? object.material.materials[ geometryGroup.materialIndex ]
			 : object.material;

	}