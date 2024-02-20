function WebGLUtils( gl, extensions, capabilities ) {

    	const isWebGL2 = capabilities.isWebGL2;

    	function convert( p ) {

    		let extension;

    		if ( p === UnsignedByteType ) return 5121;
    		if ( p === UnsignedShort4444Type ) return 32819;
    		if ( p === UnsignedShort5551Type ) return 32820;
    		if ( p === UnsignedShort565Type ) return 33635;

    		if ( p === ByteType ) return 5120;
    		if ( p === ShortType ) return 5122;
    		if ( p === UnsignedShortType ) return 5123;
    		if ( p === IntType ) return 5124;
    		if ( p === UnsignedIntType ) return 5125;
    		if ( p === FloatType ) return 5126;

    		if ( p === HalfFloatType ) {

    			if ( isWebGL2 ) return 5131;

    			extension = extensions.get( 'OES_texture_half_float' );

    			if ( extension !== null ) {

    				return extension.HALF_FLOAT_OES;

    			} else {

    				return null;

    			}

    		}

    		if ( p === AlphaFormat ) return 6406;
    		if ( p === RGBFormat ) return 6407;
    		if ( p === RGBAFormat ) return 6408;
    		if ( p === LuminanceFormat ) return 6409;
    		if ( p === LuminanceAlphaFormat ) return 6410;
    		if ( p === DepthFormat ) return 6402;
    		if ( p === DepthStencilFormat ) return 34041;
    		if ( p === RedFormat ) return 6403;

    		// WebGL2 formats.

    		if ( p === RedIntegerFormat ) return 36244;
    		if ( p === RGFormat ) return 33319;
    		if ( p === RGIntegerFormat ) return 33320;
    		if ( p === RGBIntegerFormat ) return 36248;
    		if ( p === RGBAIntegerFormat ) return 36249;

    		if ( p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
    			p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format ) {

    			extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

    			if ( extension !== null ) {

    				if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
    				if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
    				if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
    				if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

    			} else {

    				return null;

    			}

    		}

    		if ( p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
    			p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format ) {

    			extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

    			if ( extension !== null ) {

    				if ( p === RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
    				if ( p === RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
    				if ( p === RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
    				if ( p === RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

    			} else {

    				return null;

    			}

    		}

    		if ( p === RGB_ETC1_Format ) {

    			extension = extensions.get( 'WEBGL_compressed_texture_etc1' );

    			if ( extension !== null ) {

    				return extension.COMPRESSED_RGB_ETC1_WEBGL;

    			} else {

    				return null;

    			}

    		}

    		if ( p === RGB_ETC2_Format || p === RGBA_ETC2_EAC_Format ) {

    			extension = extensions.get( 'WEBGL_compressed_texture_etc' );

    			if ( extension !== null ) {

    				if ( p === RGB_ETC2_Format ) return extension.COMPRESSED_RGB8_ETC2;
    				if ( p === RGBA_ETC2_EAC_Format ) return extension.COMPRESSED_RGBA8_ETC2_EAC;

    			}

    		}

    		if ( p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
    			p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
    			p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
    			p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
    			p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ||
    			p === SRGB8_ALPHA8_ASTC_4x4_Format || p === SRGB8_ALPHA8_ASTC_5x4_Format || p === SRGB8_ALPHA8_ASTC_5x5_Format ||
    			p === SRGB8_ALPHA8_ASTC_6x5_Format || p === SRGB8_ALPHA8_ASTC_6x6_Format || p === SRGB8_ALPHA8_ASTC_8x5_Format ||
    			p === SRGB8_ALPHA8_ASTC_8x6_Format || p === SRGB8_ALPHA8_ASTC_8x8_Format || p === SRGB8_ALPHA8_ASTC_10x5_Format ||
    			p === SRGB8_ALPHA8_ASTC_10x6_Format || p === SRGB8_ALPHA8_ASTC_10x8_Format || p === SRGB8_ALPHA8_ASTC_10x10_Format ||
    			p === SRGB8_ALPHA8_ASTC_12x10_Format || p === SRGB8_ALPHA8_ASTC_12x12_Format ) {

    			extension = extensions.get( 'WEBGL_compressed_texture_astc' );

    			if ( extension !== null ) {

    				// TODO Complete?

    				return p;

    			} else {

    				return null;

    			}

    		}

    		if ( p === RGBA_BPTC_Format ) {

    			extension = extensions.get( 'EXT_texture_compression_bptc' );

    			if ( extension !== null ) {

    				// TODO Complete?

    				return p;

    			} else {

    				return null;

    			}

    		}

    		if ( p === UnsignedInt248Type ) {

    			if ( isWebGL2 ) return 34042;

    			extension = extensions.get( 'WEBGL_depth_texture' );

    			if ( extension !== null ) {

    				return extension.UNSIGNED_INT_24_8_WEBGL;

    			} else {

    				return null;

    			}

    		}

    	}

    	return { convert: convert };

    }