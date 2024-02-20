function WebGLRenderTargetCube( width, height, options ) {

	console.warn( 'THREE.WebGLRenderTargetCube( width, height, options ) is now WebGLCubeRenderTarget( size, options ).' );
	return new WebGLCubeRenderTarget( width, options );

}