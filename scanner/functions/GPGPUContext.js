function GPGPUContext(gl) {
	    this.outputTexture = null;
	    this.program = null;
	    this.disposed = false;
	    this.vertexAttrsAreBound = false;
	    this.itemsToPoll = [];
	    var glVersion = env().getNumber('WEBGL_VERSION');

	    if (gl != null) {
	      this.gl = gl;
	      setWebGLContext(glVersion, gl);
	    } else {
	      this.gl = getWebGLContext(glVersion);
	    } // WebGL 2.0 enables texture floats without an extension.


	    var COLOR_BUFFER_FLOAT = 'WEBGL_color_buffer_float';
	    var COLOR_BUFFER_HALF_FLOAT = 'EXT_color_buffer_half_float';

	    if (env().getNumber('WEBGL_VERSION') === 1) {
	      var TEXTURE_FLOAT = 'OES_texture_float';
	      var TEXTURE_HALF_FLOAT = 'OES_texture_half_float';
	      this.textureFloatExtension = getExtensionOrThrow(this.gl, TEXTURE_FLOAT);

	      if (hasExtension(this.gl, TEXTURE_HALF_FLOAT)) {
	        this.textureHalfFloatExtension = getExtensionOrThrow(this.gl, TEXTURE_HALF_FLOAT);
	      } else if (env().get('WEBGL_FORCE_F16_TEXTURES')) {
	        throw new Error('GL context does not support half float textures, yet the ' + 'environment flag WEBGL_FORCE_F16_TEXTURES is set to true.');
	      }

	      this.colorBufferFloatExtension = this.gl.getExtension(COLOR_BUFFER_FLOAT);

	      if (hasExtension(this.gl, COLOR_BUFFER_HALF_FLOAT)) {
	        this.colorBufferHalfFloatExtension = getExtensionOrThrow(this.gl, COLOR_BUFFER_HALF_FLOAT);
	      } else if (env().get('WEBGL_FORCE_F16_TEXTURES')) {
	        throw new Error('GL context does not support color renderable half floats, yet ' + 'the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.');
	      }
	    } else {
	      COLOR_BUFFER_FLOAT = 'EXT_color_buffer_float';

	      if (hasExtension(this.gl, COLOR_BUFFER_FLOAT)) {
	        this.colorBufferFloatExtension = this.gl.getExtension(COLOR_BUFFER_FLOAT);
	      } else if (hasExtension(this.gl, COLOR_BUFFER_HALF_FLOAT)) {
	        this.colorBufferHalfFloatExtension = this.gl.getExtension(COLOR_BUFFER_HALF_FLOAT);
	      } else {
	        throw new Error('GL context does not support color renderable floats');
	      }
	    }

	    this.vertexBuffer = createVertexBuffer(this.gl);
	    this.indexBuffer = createIndexBuffer(this.gl);
	    this.framebuffer = createFramebuffer(this.gl);
	    this.textureConfig = getTextureConfig(this.gl, this.textureHalfFloatExtension);
	  }