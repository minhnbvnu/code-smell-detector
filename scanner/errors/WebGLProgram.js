function WebGLProgram( renderer, cacheKey, parameters, bindingStates ) {

    	// TODO Send this event to Three.js DevTools
    	// console.log( 'WebGLProgram', cacheKey );

    	const gl = renderer.getContext();

    	const defines = parameters.defines;

    	let vertexShader = parameters.vertexShader;
    	let fragmentShader = parameters.fragmentShader;

    	const shadowMapTypeDefine = generateShadowMapTypeDefine( parameters );
    	const envMapTypeDefine = generateEnvMapTypeDefine( parameters );
    	const envMapModeDefine = generateEnvMapModeDefine( parameters );
    	const envMapBlendingDefine = generateEnvMapBlendingDefine( parameters );


    	const gammaFactorDefine = ( renderer.gammaFactor > 0 ) ? renderer.gammaFactor : 1.0;

    	const customExtensions = parameters.isWebGL2 ? '' : generateExtensions( parameters );

    	const customDefines = generateDefines( defines );

    	const program = gl.createProgram();

    	let prefixVertex, prefixFragment;
    	let versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + '\n' : '';

    	if ( parameters.isRawShaderMaterial ) {

    		prefixVertex = [

    			customDefines

    		].filter( filterEmptyLine ).join( '\n' );

    		if ( prefixVertex.length > 0 ) {

    			prefixVertex += '\n';

    		}

    		prefixFragment = [

    			customExtensions,
    			customDefines

    		].filter( filterEmptyLine ).join( '\n' );

    		if ( prefixFragment.length > 0 ) {

    			prefixFragment += '\n';

    		}

    	} else {

    		prefixVertex = [

    			generatePrecision( parameters ),

    			'#define SHADER_NAME ' + parameters.shaderName,

    			customDefines,

    			parameters.instancing ? '#define USE_INSTANCING' : '',
    			parameters.instancingColor ? '#define USE_INSTANCING_COLOR' : '',

    			parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

    			'#define GAMMA_FACTOR ' + gammaFactorDefine,

    			'#define MAX_BONES ' + parameters.maxBones,
    			( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
    			( parameters.useFog && parameters.fogExp2 ) ? '#define FOG_EXP2' : '',

    			parameters.map ? '#define USE_MAP' : '',
    			parameters.envMap ? '#define USE_ENVMAP' : '',
    			parameters.envMap ? '#define ' + envMapModeDefine : '',
    			parameters.lightMap ? '#define USE_LIGHTMAP' : '',
    			parameters.aoMap ? '#define USE_AOMAP' : '',
    			parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
    			parameters.bumpMap ? '#define USE_BUMPMAP' : '',
    			parameters.normalMap ? '#define USE_NORMALMAP' : '',
    			( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
    			( parameters.normalMap && parameters.tangentSpaceNormalMap ) ? '#define TANGENTSPACE_NORMALMAP' : '',

    			parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
    			parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
    			parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',

    			parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',

    			parameters.specularMap ? '#define USE_SPECULARMAP' : '',
    			parameters.specularIntensityMap ? '#define USE_SPECULARINTENSITYMAP' : '',
    			parameters.specularColorMap ? '#define USE_SPECULARCOLORMAP' : '',

    			parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
    			parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
    			parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

    			parameters.transmission ? '#define USE_TRANSMISSION' : '',
    			parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
    			parameters.thicknessMap ? '#define USE_THICKNESSMAP' : '',

    			parameters.sheenColorMap ? '#define USE_SHEENCOLORMAP' : '',
    			parameters.sheenRoughnessMap ? '#define USE_SHEENROUGHNESSMAP' : '',

    			parameters.vertexTangents ? '#define USE_TANGENT' : '',
    			parameters.vertexColors ? '#define USE_COLOR' : '',
    			parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
    			parameters.vertexUvs ? '#define USE_UV' : '',
    			parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

    			parameters.flatShading ? '#define FLAT_SHADED' : '',

    			parameters.skinning ? '#define USE_SKINNING' : '',
    			parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

    			parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
    			parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
    			( parameters.morphTargets && parameters.isWebGL2 ) ? '#define MORPHTARGETS_TEXTURE' : '',
    			( parameters.morphTargets && parameters.isWebGL2 ) ? '#define MORPHTARGETS_COUNT ' + parameters.morphTargetsCount : '',
    			parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
    			parameters.flipSided ? '#define FLIP_SIDED' : '',

    			parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
    			parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

    			parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

    			parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
    			( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

    			'uniform mat4 modelMatrix;',
    			'uniform mat4 modelViewMatrix;',
    			'uniform mat4 projectionMatrix;',
    			'uniform mat4 viewMatrix;',
    			'uniform mat3 normalMatrix;',
    			'uniform vec3 cameraPosition;',
    			'uniform bool isOrthographic;',

    			'#ifdef USE_INSTANCING',

    			'	attribute mat4 instanceMatrix;',

    			'#endif',

    			'#ifdef USE_INSTANCING_COLOR',

    			'	attribute vec3 instanceColor;',

    			'#endif',

    			'attribute vec3 position;',
    			'attribute vec3 normal;',
    			'attribute vec2 uv;',

    			'#ifdef USE_TANGENT',

    			'	attribute vec4 tangent;',

    			'#endif',

    			'#if defined( USE_COLOR_ALPHA )',

    			'	attribute vec4 color;',

    			'#elif defined( USE_COLOR )',

    			'	attribute vec3 color;',

    			'#endif',

    			'#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )',

    			'	attribute vec3 morphTarget0;',
    			'	attribute vec3 morphTarget1;',
    			'	attribute vec3 morphTarget2;',
    			'	attribute vec3 morphTarget3;',

    			'	#ifdef USE_MORPHNORMALS',

    			'		attribute vec3 morphNormal0;',
    			'		attribute vec3 morphNormal1;',
    			'		attribute vec3 morphNormal2;',
    			'		attribute vec3 morphNormal3;',

    			'	#else',

    			'		attribute vec3 morphTarget4;',
    			'		attribute vec3 morphTarget5;',
    			'		attribute vec3 morphTarget6;',
    			'		attribute vec3 morphTarget7;',

    			'	#endif',

    			'#endif',

    			'#ifdef USE_SKINNING',

    			'	attribute vec4 skinIndex;',
    			'	attribute vec4 skinWeight;',

    			'#endif',

    			'\n'

    		].filter( filterEmptyLine ).join( '\n' );

    		prefixFragment = [

    			customExtensions,

    			generatePrecision( parameters ),

    			'#define SHADER_NAME ' + parameters.shaderName,

    			customDefines,

    			'#define GAMMA_FACTOR ' + gammaFactorDefine,

    			( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
    			( parameters.useFog && parameters.fogExp2 ) ? '#define FOG_EXP2' : '',

    			parameters.map ? '#define USE_MAP' : '',
    			parameters.matcap ? '#define USE_MATCAP' : '',
    			parameters.envMap ? '#define USE_ENVMAP' : '',
    			parameters.envMap ? '#define ' + envMapTypeDefine : '',
    			parameters.envMap ? '#define ' + envMapModeDefine : '',
    			parameters.envMap ? '#define ' + envMapBlendingDefine : '',
    			parameters.lightMap ? '#define USE_LIGHTMAP' : '',
    			parameters.aoMap ? '#define USE_AOMAP' : '',
    			parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
    			parameters.bumpMap ? '#define USE_BUMPMAP' : '',
    			parameters.normalMap ? '#define USE_NORMALMAP' : '',
    			( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
    			( parameters.normalMap && parameters.tangentSpaceNormalMap ) ? '#define TANGENTSPACE_NORMALMAP' : '',

    			parameters.clearcoat ? '#define USE_CLEARCOAT' : '',
    			parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
    			parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
    			parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',

    			parameters.specularMap ? '#define USE_SPECULARMAP' : '',
    			parameters.specularIntensityMap ? '#define USE_SPECULARINTENSITYMAP' : '',
    			parameters.specularColorMap ? '#define USE_SPECULARCOLORMAP' : '',
    			parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
    			parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',

    			parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
    			parameters.alphaTest ? '#define USE_ALPHATEST' : '',

    			parameters.sheen ? '#define USE_SHEEN' : '',
    			parameters.sheenColorMap ? '#define USE_SHEENCOLORMAP' : '',
    			parameters.sheenRoughnessMap ? '#define USE_SHEENROUGHNESSMAP' : '',

    			parameters.transmission ? '#define USE_TRANSMISSION' : '',
    			parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
    			parameters.thicknessMap ? '#define USE_THICKNESSMAP' : '',

    			parameters.vertexTangents ? '#define USE_TANGENT' : '',
    			parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '',
    			parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
    			parameters.vertexUvs ? '#define USE_UV' : '',
    			parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

    			parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

    			parameters.flatShading ? '#define FLAT_SHADED' : '',

    			parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
    			parameters.flipSided ? '#define FLIP_SIDED' : '',

    			parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
    			parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

    			parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

    			parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

    			parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
    			( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

    			( ( parameters.extensionShaderTextureLOD || parameters.envMap ) && parameters.rendererExtensionShaderTextureLod ) ? '#define TEXTURE_LOD_EXT' : '',

    			'uniform mat4 viewMatrix;',
    			'uniform vec3 cameraPosition;',
    			'uniform bool isOrthographic;',

    			( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
    			( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
    			( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

    			parameters.dithering ? '#define DITHERING' : '',
    			parameters.format === RGBFormat ? '#define OPAQUE' : '',

    			ShaderChunk[ 'encodings_pars_fragment' ], // this code is required here because it is used by the various encoding/decoding function defined below
    			parameters.map ? getTexelDecodingFunction( 'mapTexelToLinear', parameters.mapEncoding ) : '',
    			parameters.matcap ? getTexelDecodingFunction( 'matcapTexelToLinear', parameters.matcapEncoding ) : '',
    			parameters.envMap ? getTexelDecodingFunction( 'envMapTexelToLinear', parameters.envMapEncoding ) : '',
    			parameters.emissiveMap ? getTexelDecodingFunction( 'emissiveMapTexelToLinear', parameters.emissiveMapEncoding ) : '',
    			parameters.specularColorMap ? getTexelDecodingFunction( 'specularColorMapTexelToLinear', parameters.specularColorMapEncoding ) : '',
    			parameters.sheenColorMap ? getTexelDecodingFunction( 'sheenColorMapTexelToLinear', parameters.sheenColorMapEncoding ) : '',
    			parameters.lightMap ? getTexelDecodingFunction( 'lightMapTexelToLinear', parameters.lightMapEncoding ) : '',
    			getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputEncoding ),

    			parameters.depthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '',

    			'\n'

    		].filter( filterEmptyLine ).join( '\n' );

    	}

    	vertexShader = resolveIncludes( vertexShader );
    	vertexShader = replaceLightNums( vertexShader, parameters );
    	vertexShader = replaceClippingPlaneNums( vertexShader, parameters );

    	fragmentShader = resolveIncludes( fragmentShader );
    	fragmentShader = replaceLightNums( fragmentShader, parameters );
    	fragmentShader = replaceClippingPlaneNums( fragmentShader, parameters );

    	vertexShader = unrollLoops( vertexShader );
    	fragmentShader = unrollLoops( fragmentShader );

    	if ( parameters.isWebGL2 && parameters.isRawShaderMaterial !== true ) {

    		// GLSL 3.0 conversion for built-in materials and ShaderMaterial

    		versionString = '#version 300 es\n';

    		prefixVertex = [
    			'precision mediump sampler2DArray;',
    			'#define attribute in',
    			'#define varying out',
    			'#define texture2D texture'
    		].join( '\n' ) + '\n' + prefixVertex;

    		prefixFragment = [
    			'#define varying in',
    			( parameters.glslVersion === GLSL3 ) ? '' : 'out highp vec4 pc_fragColor;',
    			( parameters.glslVersion === GLSL3 ) ? '' : '#define gl_FragColor pc_fragColor',
    			'#define gl_FragDepthEXT gl_FragDepth',
    			'#define texture2D texture',
    			'#define textureCube texture',
    			'#define texture2DProj textureProj',
    			'#define texture2DLodEXT textureLod',
    			'#define texture2DProjLodEXT textureProjLod',
    			'#define textureCubeLodEXT textureLod',
    			'#define texture2DGradEXT textureGrad',
    			'#define texture2DProjGradEXT textureProjGrad',
    			'#define textureCubeGradEXT textureGrad'
    		].join( '\n' ) + '\n' + prefixFragment;

    	}

    	const vertexGlsl = versionString + prefixVertex + vertexShader;
    	const fragmentGlsl = versionString + prefixFragment + fragmentShader;

    	// console.log( '*VERTEX*', vertexGlsl );
    	// console.log( '*FRAGMENT*', fragmentGlsl );

    	const glVertexShader = WebGLShader( gl, 35633, vertexGlsl );
    	const glFragmentShader = WebGLShader( gl, 35632, fragmentGlsl );

    	gl.attachShader( program, glVertexShader );
    	gl.attachShader( program, glFragmentShader );

    	// Force a particular attribute to index 0.

    	if ( parameters.index0AttributeName !== undefined ) {

    		gl.bindAttribLocation( program, 0, parameters.index0AttributeName );

    	} else if ( parameters.morphTargets === true ) {

    		// programs with morphTargets displace position out of attribute 0
    		gl.bindAttribLocation( program, 0, 'position' );

    	}

    	gl.linkProgram( program );

    	// check for link errors
    	if ( renderer.debug.checkShaderErrors ) {

    		const programLog = gl.getProgramInfoLog( program ).trim();
    		const vertexLog = gl.getShaderInfoLog( glVertexShader ).trim();
    		const fragmentLog = gl.getShaderInfoLog( glFragmentShader ).trim();

    		let runnable = true;
    		let haveDiagnostics = true;

    		if ( gl.getProgramParameter( program, 35714 ) === false ) {

    			runnable = false;

    			const vertexErrors = getShaderErrors( gl, glVertexShader, 'vertex' );
    			const fragmentErrors = getShaderErrors( gl, glFragmentShader, 'fragment' );

    			console.error(
    				'THREE.WebGLProgram: Shader Error ' + gl.getError() + ' - ' +
    				'VALIDATE_STATUS ' + gl.getProgramParameter( program, 35715 ) + '\n\n' +
    				'Program Info Log: ' + programLog + '\n' +
    				vertexErrors + '\n' +
    				fragmentErrors
    			);

    		} else if ( programLog !== '' ) {

    			console.warn( 'THREE.WebGLProgram: Program Info Log:', programLog );

    		} else if ( vertexLog === '' || fragmentLog === '' ) {

    			haveDiagnostics = false;

    		}

    		if ( haveDiagnostics ) {

    			this.diagnostics = {

    				runnable: runnable,

    				programLog: programLog,

    				vertexShader: {

    					log: vertexLog,
    					prefix: prefixVertex

    				},

    				fragmentShader: {

    					log: fragmentLog,
    					prefix: prefixFragment

    				}

    			};

    		}

    	}

    	// Clean up

    	// Crashes in iOS9 and iOS10. #18402
    	// gl.detachShader( program, glVertexShader );
    	// gl.detachShader( program, glFragmentShader );

    	gl.deleteShader( glVertexShader );
    	gl.deleteShader( glFragmentShader );

    	// set up caching for uniform locations

    	let cachedUniforms;

    	this.getUniforms = function () {

    		if ( cachedUniforms === undefined ) {

    			cachedUniforms = new WebGLUniforms( gl, program );

    		}

    		return cachedUniforms;

    	};

    	// set up caching for attribute locations

    	let cachedAttributes;

    	this.getAttributes = function () {

    		if ( cachedAttributes === undefined ) {

    			cachedAttributes = fetchAttributeLocations( gl, program );

    		}

    		return cachedAttributes;

    	};

    	// free resource

    	this.destroy = function () {

    		bindingStates.releaseStatesOfProgram( this );

    		gl.deleteProgram( program );
    		this.program = undefined;

    	};

    	//

    	this.name = parameters.shaderName;
    	this.id = programIdCount ++;
    	this.cacheKey = cacheKey;
    	this.usedTimes = 1;
    	this.program = program;
    	this.vertexShader = glVertexShader;
    	this.fragmentShader = glFragmentShader;

    	return this;

    }