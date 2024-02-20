function createMeshBuffers ( geometryGroup ) {

		geometryGroup.__webglVertexBuffer = _gl.createBuffer();
		geometryGroup.__webglNormalBuffer = _gl.createBuffer();
		geometryGroup.__webglTangentBuffer = _gl.createBuffer();
		geometryGroup.__webglColorBuffer = _gl.createBuffer();
		geometryGroup.__webglUVBuffer = _gl.createBuffer();
		geometryGroup.__webglUV2Buffer = _gl.createBuffer();

		geometryGroup.__webglSkinIndicesBuffer = _gl.createBuffer();
		geometryGroup.__webglSkinWeightsBuffer = _gl.createBuffer();

		geometryGroup.__webglFaceBuffer = _gl.createBuffer();
		geometryGroup.__webglLineBuffer = _gl.createBuffer();

		var numMorphTargets = geometryGroup.numMorphTargets;

		if ( numMorphTargets ) {

			geometryGroup.__webglMorphTargetsBuffers = [];

			for ( var m = 0, ml = numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__webglMorphTargetsBuffers.push( _gl.createBuffer() );

			}

		}

		var numMorphNormals = geometryGroup.numMorphNormals;

		if ( numMorphNormals ) {

			geometryGroup.__webglMorphNormalsBuffers = [];

			for ( var m = 0, ml = numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__webglMorphNormalsBuffers.push( _gl.createBuffer() );

			}

		}

		_this.info.memory.geometries ++;

	}