function verifyColorSpace( texture, image ) {

		const encoding = texture.encoding;
		const format = texture.format;
		const type = texture.type;

		if ( texture.isCompressedTexture === true || texture.isVideoTexture === true || texture.format === _SRGBAFormat ) return image;

		if ( encoding !== LinearEncoding ) {

			// sRGB

			if ( encoding === sRGBEncoding ) {

				if ( isWebGL2 === false ) {

					// in WebGL 1, try to use EXT_sRGB extension and unsized formats

					if ( extensions.has( 'EXT_sRGB' ) === true && format === RGBAFormat ) {

						texture.format = _SRGBAFormat;

						// it's not possible to generate mips in WebGL 1 with this extension

						texture.minFilter = LinearFilter;
						texture.generateMipmaps = false;

					} else {

						// slow fallback (CPU decode)

						image = ImageUtils.sRGBToLinear( image );

					}

				} else {

					// in WebGL 2 uncompressed textures can only be sRGB encoded if they have the RGBA8 format

					if ( format !== RGBAFormat || type !== UnsignedByteType ) {

						console.warn( 'THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.' );

					}

				}

			} else {

				console.error( 'THREE.WebGLTextures: Unsupported texture encoding:', encoding );

			}

		}

		return image;

	}