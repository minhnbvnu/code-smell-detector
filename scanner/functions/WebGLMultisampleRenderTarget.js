function WebGLMultisampleRenderTarget( width, height, options ) {

	console.error( 'THREE.WebGLMultisampleRenderTarget has been removed. Use a normal render target and set the "samples" property to greater 0 to enable multisampling.' );
	const renderTarget = new WebGLRenderTarget( width, height, options );
	renderTarget.samples = 4;
	return renderTarget;

}