function materialNeedsFaceNormals ( material ) {

		return material instanceof THREE.MeshPhongMaterial === false && material.shading === THREE.FlatShading;

	}