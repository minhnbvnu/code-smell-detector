function textureToPattern( texture ) {

		if ( texture instanceof THREE.CompressedTexture ) return;

		var repeatX = texture.wrapS === THREE.RepeatWrapping;
		var repeatY = texture.wrapT === THREE.RepeatWrapping;

		var image = texture.image;

		var canvas = document.createElement( 'canvas' );
		canvas.width = image.width;
		canvas.height = image.height;

		var context = canvas.getContext( '2d' );
		context.setTransform( 1, 0, 0, - 1, 0, image.height );
		context.drawImage( image, 0, 0 );

		_patterns[ texture.id ] = _context.createPattern(
			canvas, repeatX === true && repeatY === true
				? 'repeat'
				: repeatX === true && repeatY === false
					? 'repeat-x'
					: repeatX === false && repeatY === true
						? 'repeat-y'
						: 'no-repeat'
		);

	}