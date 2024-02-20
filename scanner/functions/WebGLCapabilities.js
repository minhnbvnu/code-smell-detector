function WebGLCapabilities( gl, extensions, parameters ) {

    	let maxAnisotropy;

    	function getMaxAnisotropy() {

    		if ( maxAnisotropy !== undefined ) return maxAnisotropy;

    		if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

    			const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

    			maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

    		} else {

    			maxAnisotropy = 0;

    		}

    		return maxAnisotropy;

    	}

    	function getMaxPrecision( precision ) {

    		if ( precision === 'highp' ) {

    			if ( gl.getShaderPrecisionFormat( 35633, 36338 ).precision > 0 &&
    				gl.getShaderPrecisionFormat( 35632, 36338 ).precision > 0 ) {

    				return 'highp';

    			}

    			precision = 'mediump';

    		}

    		if ( precision === 'mediump' ) {

    			if ( gl.getShaderPrecisionFormat( 35633, 36337 ).precision > 0 &&
    				gl.getShaderPrecisionFormat( 35632, 36337 ).precision > 0 ) {

    				return 'mediump';

    			}

    		}

    		return 'lowp';

    	}

    	/* eslint-disable no-undef */
    	const isWebGL2 = ( typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext ) ||
    		( typeof WebGL2ComputeRenderingContext !== 'undefined' && gl instanceof WebGL2ComputeRenderingContext );
    	/* eslint-enable no-undef */

    	let precision = parameters.precision !== undefined ? parameters.precision : 'highp';
    	const maxPrecision = getMaxPrecision( precision );

    	if ( maxPrecision !== precision ) {

    		console.warn( 'THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.' );
    		precision = maxPrecision;

    	}

    	const drawBuffers = isWebGL2 || extensions.has( 'WEBGL_draw_buffers' );

    	const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

    	const maxTextures = gl.getParameter( 34930 );
    	const maxVertexTextures = gl.getParameter( 35660 );
    	const maxTextureSize = gl.getParameter( 3379 );
    	const maxCubemapSize = gl.getParameter( 34076 );

    	const maxAttributes = gl.getParameter( 34921 );
    	const maxVertexUniforms = gl.getParameter( 36347 );
    	const maxVaryings = gl.getParameter( 36348 );
    	const maxFragmentUniforms = gl.getParameter( 36349 );

    	const vertexTextures = maxVertexTextures > 0;
    	const floatFragmentTextures = isWebGL2 || extensions.has( 'OES_texture_float' );
    	const floatVertexTextures = vertexTextures && floatFragmentTextures;

    	const maxSamples = isWebGL2 ? gl.getParameter( 36183 ) : 0;

    	return {

    		isWebGL2: isWebGL2,

    		drawBuffers: drawBuffers,

    		getMaxAnisotropy: getMaxAnisotropy,
    		getMaxPrecision: getMaxPrecision,

    		precision: precision,
    		logarithmicDepthBuffer: logarithmicDepthBuffer,

    		maxTextures: maxTextures,
    		maxVertexTextures: maxVertexTextures,
    		maxTextureSize: maxTextureSize,
    		maxCubemapSize: maxCubemapSize,

    		maxAttributes: maxAttributes,
    		maxVertexUniforms: maxVertexUniforms,
    		maxVaryings: maxVaryings,
    		maxFragmentUniforms: maxFragmentUniforms,

    		vertexTextures: vertexTextures,
    		floatFragmentTextures: floatFragmentTextures,
    		floatVertexTextures: floatVertexTextures,

    		maxSamples: maxSamples

    	};

    }