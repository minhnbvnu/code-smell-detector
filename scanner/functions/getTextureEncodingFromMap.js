function getTextureEncodingFromMap( map ) {

    		let encoding;

    		if ( map && map.isTexture ) {

    			encoding = map.encoding;

    		} else if ( map && map.isWebGLRenderTarget ) {

    			console.warn( 'THREE.WebGLPrograms.getTextureEncodingFromMap: don\'t use render targets as textures. Use their .texture property instead.' );
    			encoding = map.texture.encoding;

    		} else {

    			encoding = LinearEncoding;

    		}

    		/* if ( isWebGL2 && map && map.isTexture && map.format === RGBAFormat && map.type === UnsignedByteType && map.encoding === sRGBEncoding ) {

    			encoding = LinearEncoding; // disable inline decode for sRGB textures in WebGL 2

    		} */

    		return encoding;

    	}