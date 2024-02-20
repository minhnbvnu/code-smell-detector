function setupView( lights, camera ) {

    		let directionalLength = 0;
    		let pointLength = 0;
    		let spotLength = 0;
    		let rectAreaLength = 0;
    		let hemiLength = 0;

    		const viewMatrix = camera.matrixWorldInverse;

    		for ( let i = 0, l = lights.length; i < l; i ++ ) {

    			const light = lights[ i ];

    			if ( light.isDirectionalLight ) {

    				const uniforms = state.directional[ directionalLength ];

    				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
    				vector3.setFromMatrixPosition( light.target.matrixWorld );
    				uniforms.direction.sub( vector3 );
    				uniforms.direction.transformDirection( viewMatrix );

    				directionalLength ++;

    			} else if ( light.isSpotLight ) {

    				const uniforms = state.spot[ spotLength ];

    				uniforms.position.setFromMatrixPosition( light.matrixWorld );
    				uniforms.position.applyMatrix4( viewMatrix );

    				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
    				vector3.setFromMatrixPosition( light.target.matrixWorld );
    				uniforms.direction.sub( vector3 );
    				uniforms.direction.transformDirection( viewMatrix );

    				spotLength ++;

    			} else if ( light.isRectAreaLight ) {

    				const uniforms = state.rectArea[ rectAreaLength ];

    				uniforms.position.setFromMatrixPosition( light.matrixWorld );
    				uniforms.position.applyMatrix4( viewMatrix );

    				// extract local rotation of light to derive width/height half vectors
    				matrix42.identity();
    				matrix4.copy( light.matrixWorld );
    				matrix4.premultiply( viewMatrix );
    				matrix42.extractRotation( matrix4 );

    				uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
    				uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

    				uniforms.halfWidth.applyMatrix4( matrix42 );
    				uniforms.halfHeight.applyMatrix4( matrix42 );

    				rectAreaLength ++;

    			} else if ( light.isPointLight ) {

    				const uniforms = state.point[ pointLength ];

    				uniforms.position.setFromMatrixPosition( light.matrixWorld );
    				uniforms.position.applyMatrix4( viewMatrix );

    				pointLength ++;

    			} else if ( light.isHemisphereLight ) {

    				const uniforms = state.hemi[ hemiLength ];

    				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
    				uniforms.direction.transformDirection( viewMatrix );
    				uniforms.direction.normalize();

    				hemiLength ++;

    			}

    		}

    	}