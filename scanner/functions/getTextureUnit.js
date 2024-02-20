function getTextureUnit() {

		var textureUnit = _usedTextureUnits;

		if ( textureUnit >= _maxTextures ) {

			THREE.warn( 'WebGLRenderer: trying to use ' + textureUnit + ' texture units while this GPU supports only ' + _maxTextures );

		}

		_usedTextureUnits += 1;

		return textureUnit;

	}