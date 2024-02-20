function initGLContext() {

    		extensions = new WebGLExtensions( _gl );

    		capabilities = new WebGLCapabilities( _gl, extensions, parameters );

    		extensions.init( capabilities );

    		utils = new WebGLUtils( _gl, extensions, capabilities );

    		state = new WebGLState( _gl, extensions, capabilities );

    		_currentDrawBuffers[ 0 ] = 1029;

    		info = new WebGLInfo( _gl );
    		properties = new WebGLProperties();
    		textures = new WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info );
    		cubemaps = new WebGLCubeMaps( _this );
    		cubeuvmaps = new WebGLCubeUVMaps( _this );
    		attributes = new WebGLAttributes( _gl, capabilities );
    		bindingStates = new WebGLBindingStates( _gl, extensions, attributes, capabilities );
    		geometries = new WebGLGeometries( _gl, attributes, info, bindingStates );
    		objects = new WebGLObjects( _gl, geometries, attributes, info );
    		morphtargets = new WebGLMorphtargets( _gl, capabilities, textures );
    		clipping = new WebGLClipping( properties );
    		programCache = new WebGLPrograms( _this, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping );
    		materials = new WebGLMaterials( properties );
    		renderLists = new WebGLRenderLists( properties );
    		renderStates = new WebGLRenderStates( extensions, capabilities );
    		background = new WebGLBackground( _this, cubemaps, state, objects, _premultipliedAlpha );
    		shadowMap = new WebGLShadowMap( _this, objects, capabilities );

    		bufferRenderer = new WebGLBufferRenderer( _gl, extensions, info, capabilities );
    		indexedBufferRenderer = new WebGLIndexedBufferRenderer( _gl, extensions, info, capabilities );

    		info.programs = programCache.programs;

    		_this.capabilities = capabilities;
    		_this.extensions = extensions;
    		_this.properties = properties;
    		_this.renderLists = renderLists;
    		_this.shadowMap = shadowMap;
    		_this.state = state;
    		_this.info = info;

    	}