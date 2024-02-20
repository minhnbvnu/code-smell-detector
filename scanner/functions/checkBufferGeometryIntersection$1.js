function checkBufferGeometryIntersection$1( object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c ) {

    	_vA$1.fromBufferAttribute( position, a );
    	_vB$1.fromBufferAttribute( position, b );
    	_vC$1.fromBufferAttribute( position, c );

    	const morphInfluences = object.morphTargetInfluences;

    	if ( morphPosition && morphInfluences ) {

    		_morphA.set( 0, 0, 0 );
    		_morphB.set( 0, 0, 0 );
    		_morphC.set( 0, 0, 0 );

    		for ( let i = 0, il = morphPosition.length; i < il; i ++ ) {

    			const influence = morphInfluences[ i ];
    			const morphAttribute = morphPosition[ i ];

    			if ( influence === 0 ) continue;

    			_tempA.fromBufferAttribute( morphAttribute, a );
    			_tempB.fromBufferAttribute( morphAttribute, b );
    			_tempC.fromBufferAttribute( morphAttribute, c );

    			if ( morphTargetsRelative ) {

    				_morphA.addScaledVector( _tempA, influence );
    				_morphB.addScaledVector( _tempB, influence );
    				_morphC.addScaledVector( _tempC, influence );

    			} else {

    				_morphA.addScaledVector( _tempA.sub( _vA$1 ), influence );
    				_morphB.addScaledVector( _tempB.sub( _vB$1 ), influence );
    				_morphC.addScaledVector( _tempC.sub( _vC$1 ), influence );

    			}

    		}

    		_vA$1.add( _morphA );
    		_vB$1.add( _morphB );
    		_vC$1.add( _morphC );

    	}

    	if ( object.isSkinnedMesh ) {

    		object.boneTransform( a, _vA$1 );
    		object.boneTransform( b, _vB$1 );
    		object.boneTransform( c, _vC$1 );

    	}

    	const intersection = checkIntersection$1( object, material, raycaster, ray, _vA$1, _vB$1, _vC$1, _intersectionPoint );

    	if ( intersection ) {

    		if ( uv ) {

    			_uvA$1.fromBufferAttribute( uv, a );
    			_uvB$1.fromBufferAttribute( uv, b );
    			_uvC$1.fromBufferAttribute( uv, c );

    			intersection.uv = Triangle.getUV( _intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2() );

    		}

    		if ( uv2 ) {

    			_uvA$1.fromBufferAttribute( uv2, a );
    			_uvB$1.fromBufferAttribute( uv2, b );
    			_uvC$1.fromBufferAttribute( uv2, c );

    			intersection.uv2 = Triangle.getUV( _intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2() );

    		}

    		const face = {
    			a: a,
    			b: b,
    			c: c,
    			normal: new Vector3(),
    			materialIndex: 0
    		};

    		Triangle.getNormal( _vA$1, _vB$1, _vC$1, face.normal );

    		intersection.face = face;

    	}

    	return intersection;

    }