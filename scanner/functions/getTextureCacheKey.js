function getTextureCacheKey( texture ) {

		const array = [];

		array.push( texture.wrapS );
		array.push( texture.wrapT );
		array.push( texture.magFilter );
		array.push( texture.minFilter );
		array.push( texture.anisotropy );
		array.push( texture.internalFormat );
		array.push( texture.format );
		array.push( texture.type );
		array.push( texture.generateMipmaps );
		array.push( texture.premultiplyAlpha );
		array.push( texture.flipY );
		array.push( texture.unpackAlignment );
		array.push( texture.encoding );

		return array.join();

	}