function generateExtensions( parameters ) {

    	const chunks = [
    		( parameters.extensionDerivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.tangentSpaceNormalMap || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical' ) ? '#extension GL_OES_standard_derivatives : enable' : '',
    		( parameters.extensionFragDepth || parameters.logarithmicDepthBuffer ) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
    		( parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers ) ? '#extension GL_EXT_draw_buffers : require' : '',
    		( parameters.extensionShaderTextureLOD || parameters.envMap || parameters.transmission ) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''
    	];

    	return chunks.filter( filterEmptyLine ).join( '\n' );

    }