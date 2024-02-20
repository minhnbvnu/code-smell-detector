function patternPath( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture ) {

		if ( texture instanceof THREE.DataTexture ) return;

		if ( texture.hasEventListener( 'update', onTextureUpdate ) === false ) {

			if ( texture.image !== undefined && texture.image.width > 0 ) {

				textureToPattern( texture );

			}

			texture.addEventListener( 'update', onTextureUpdate );

		}

		var pattern = _patterns[ texture.id ];

		if ( pattern !== undefined ) {

			setFillStyle( pattern );

		} else {

			setFillStyle( 'rgba(0,0,0,1)' );
			_context.fill();

			return;

		}

		// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120

		var a, b, c, d, e, f, det, idet,
			offsetX = texture.offset.x / texture.repeat.x,
			offsetY = texture.offset.y / texture.repeat.y,
			width = texture.image.width * texture.repeat.x,
			height = texture.image.height * texture.repeat.y;

		u0 = ( u0 + offsetX ) * width;
		v0 = ( v0 + offsetY ) * height;

		u1 = ( u1 + offsetX ) * width;
		v1 = ( v1 + offsetY ) * height;

		u2 = ( u2 + offsetX ) * width;
		v2 = ( v2 + offsetY ) * height;

		x1 -= x0; y1 -= y0;
		x2 -= x0; y2 -= y0;

		u1 -= u0; v1 -= v0;
		u2 -= u0; v2 -= v0;

		det = u1 * v2 - u2 * v1;

		if ( det === 0 ) return;

		idet = 1 / det;

		a = ( v2 * x1 - v1 * x2 ) * idet;
		b = ( v2 * y1 - v1 * y2 ) * idet;
		c = ( u1 * x2 - u2 * x1 ) * idet;
		d = ( u1 * y2 - u2 * y1 ) * idet;

		e = x0 - a * u0 - c * v0;
		f = y0 - b * u0 - d * v0;

		_context.save();
		_context.transform( a, b, c, d, e, f );
		_context.fill();
		_context.restore();

	}