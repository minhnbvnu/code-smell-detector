function setPoint( point, pointMap, geometry, camera, x, y, z ) {

	_vector.set( x, y, z ).unproject( camera );

	const points = pointMap[ point ];

	if ( points !== undefined ) {

		const position = geometry.getAttribute( 'position' );

		for ( let i = 0, l = points.length; i < l; i ++ ) {

			position.setXYZ( points[ i ], _vector.x, _vector.y, _vector.z );

		}

	}

}