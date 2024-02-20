function materialNeedsSmoothNormals ( material ) {

		return material && material.shading !== undefined && material.shading === THREE.SmoothShading;

	}