function generateTransform( transformData ) {

		var transform = new THREE.Matrix4();
		translation.set( 0, 0, 0 );
		rotation.identity();

		var order = ( transformData.eulerOrder ) ? getEulerOrder( transformData.eulerOrder ) : getEulerOrder( 0 );

		if ( transformData.translation ) translation.fromArray( transformData.translation );
		if ( transformData.rotationOffset ) translation.add( tempVec.fromArray( transformData.rotationOffset ) );

		if ( transformData.rotation ) {

			var array = transformData.rotation.map( THREE.Math.degToRad );
			array.push( order );
			rotation.makeRotationFromEuler( tempEuler.fromArray( array ) );

		}

		if ( transformData.preRotation ) {

			var array = transformData.preRotation.map( THREE.Math.degToRad );
			array.push( order );
			tempMat.makeRotationFromEuler( tempEuler.fromArray( array ) );

			rotation.premultiply( tempMat );

		}

		if ( transformData.postRotation ) {

			var array = transformData.postRotation.map( THREE.Math.degToRad );
			array.push( order );
			tempMat.makeRotationFromEuler( tempEuler.fromArray( array ) );

			tempMat.getInverse( tempMat );

			rotation.multiply( tempMat );

		}

		if ( transformData.scale ) transform.scale( tempVec.fromArray( transformData.scale ) );

		transform.setPosition( translation );
		transform.multiply( rotation );

		return transform;

	}