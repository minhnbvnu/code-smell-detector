function deleteTexture( texture ) {

		const textureProperties = properties.get( texture );
		_gl.deleteTexture( textureProperties.__webglTexture );

		const source = texture.source;
		const webglTextures = _sources.get( source );
		delete webglTextures[ textureProperties.__cacheKey ];

		info.memory.textures --;

	}