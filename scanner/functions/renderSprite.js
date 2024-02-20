function renderSprite( v1, element, material ) {

		setOpacity( material.opacity );
		setBlending( material.blending );

		var scaleX = element.scale.x * _canvasWidthHalf;
		var scaleY = element.scale.y * _canvasHeightHalf;

		var dist = 0.5 * Math.sqrt( scaleX * scaleX + scaleY * scaleY ); // allow for rotated sprite
		_elemBox.min.set( v1.x - dist, v1.y - dist );
		_elemBox.max.set( v1.x + dist, v1.y + dist );

		if ( material instanceof THREE.SpriteMaterial ) {

			var texture = material.map;

			if ( texture !== null && texture.image !== undefined ) {

				if ( texture.hasEventListener( 'update', onTextureUpdate ) === false ) {

					if ( texture.image.width > 0 ) {

						textureToPattern( texture );

					}

					texture.addEventListener( 'update', onTextureUpdate );

				}

				var pattern = _patterns[ texture.id ];

				if ( pattern !== undefined ) {

					setFillStyle( pattern );

				} else {

					setFillStyle( 'rgba( 0, 0, 0, 1 )' );

				}

				//

				var bitmap = texture.image;

				var ox = bitmap.width * texture.offset.x;
				var oy = bitmap.height * texture.offset.y;

				var sx = bitmap.width * texture.repeat.x;
				var sy = bitmap.height * texture.repeat.y;

				var cx = scaleX / sx;
				var cy = scaleY / sy;

				_context.save();
				_context.translate( v1.x, v1.y );
				if ( material.rotation !== 0 ) _context.rotate( material.rotation );
				_context.translate( - scaleX / 2, - scaleY / 2 );
				_context.scale( cx, cy );
				_context.translate( - ox, - oy );
				_context.fillRect( ox, oy, sx, sy );
				_context.restore();

			} else {

				// no texture

				setFillStyle( material.color.getStyle() );

				_context.save();
				_context.translate( v1.x, v1.y );
				if ( material.rotation !== 0 ) _context.rotate( material.rotation );
				_context.scale( scaleX, - scaleY );
				_context.fillRect( - 0.5, - 0.5, 1, 1 );
				_context.restore();

			}

		} else if ( material instanceof SpriteCanvasMaterial ) {

			setStrokeStyle( material.color.getStyle() );
			setFillStyle( material.color.getStyle() );

			_context.save();
			_context.translate( v1.x, v1.y );
			if ( material.rotation !== 0 ) _context.rotate( material.rotation );
			_context.scale( scaleX, scaleY );

			material.program( _context );

			_context.restore();

		}

		/* DEBUG
		setStrokeStyle( 'rgb(255,255,0)' );
		_context.beginPath();
		_context.moveTo( v1.x - 10, v1.y );
		_context.lineTo( v1.x + 10, v1.y );
		_context.moveTo( v1.x, v1.y - 10 );
		_context.lineTo( v1.x, v1.y + 10 );
		_context.stroke();
		*/

	}