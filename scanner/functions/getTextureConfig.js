function getTextureConfig( // tslint:disable-next-line:no-any
	gl, textureHalfFloatExtension) {
	  // tslint:disable-next-line:no-any
	  var glany = gl;
	  var internalFormatFloat;
	  var internalFormatHalfFloat;
	  var internalFormatPackedHalfFloat;
	  var internalFormatPackedFloat;
	  var textureFormatFloat;
	  var downloadTextureFormat;
	  var downloadUnpackNumChannels;
	  var defaultNumChannels;
	  var textureTypeHalfFloat;
	  var textureTypeFloat;

	  if (env().getNumber('WEBGL_VERSION') === 2) {
	    internalFormatFloat = glany.R32F;
	    internalFormatHalfFloat = glany.R16F;
	    internalFormatPackedHalfFloat = glany.RGBA16F;
	    internalFormatPackedFloat = glany.RGBA32F;
	    textureFormatFloat = glany.RED;
	    downloadUnpackNumChannels = 4;
	    defaultNumChannels = 1;
	    textureTypeHalfFloat = glany.HALF_FLOAT;
	    textureTypeFloat = glany.FLOAT;
	  } else {
	    internalFormatFloat = gl.RGBA;
	    internalFormatHalfFloat = gl.RGBA;
	    internalFormatPackedHalfFloat = gl.RGBA;
	    internalFormatPackedFloat = glany.RGBA;
	    textureFormatFloat = gl.RGBA;
	    downloadUnpackNumChannels = 4;
	    defaultNumChannels = 4;
	    textureTypeHalfFloat = textureHalfFloatExtension != null ? textureHalfFloatExtension.HALF_FLOAT_OES : null;
	    textureTypeFloat = gl.FLOAT;
	  }

	  downloadTextureFormat = gl.RGBA;
	  return {
	    internalFormatFloat: internalFormatFloat,
	    internalFormatHalfFloat: internalFormatHalfFloat,
	    internalFormatPackedHalfFloat: internalFormatPackedHalfFloat,
	    internalFormatPackedFloat: internalFormatPackedFloat,
	    textureFormatFloat: textureFormatFloat,
	    downloadTextureFormat: downloadTextureFormat,
	    downloadUnpackNumChannels: downloadUnpackNumChannels,
	    defaultNumChannels: defaultNumChannels,
	    textureTypeHalfFloat: textureTypeHalfFloat,
	    textureTypeFloat: textureTypeFloat
	  };
	}