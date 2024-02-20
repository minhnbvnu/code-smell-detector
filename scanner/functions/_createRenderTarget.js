function _createRenderTarget( params ) {

    	const cubeUVRenderTarget = new WebGLRenderTarget( 3 * SIZE_MAX, 3 * SIZE_MAX, params );
    	cubeUVRenderTarget.texture.mapping = CubeUVReflectionMapping;
    	cubeUVRenderTarget.texture.name = 'PMREM.cubeUv';
    	cubeUVRenderTarget.scissorTest = true;
    	return cubeUVRenderTarget;

    }