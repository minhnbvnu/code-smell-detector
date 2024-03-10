function setupMorphTargets ( material, geometryGroup, object ) {

		// set base

		var attributes = material.program.attributes;

		if ( object.morphTargetBase !== - 1 && attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ object.morphTargetBase ] );

			state.enableAttribute( attributes.position );

			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		} else if ( attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );

			state.enableAttribute( attributes.position );

			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.morphTargetForcedOrder.length ) {

			// set forced order

			var m = 0;
			var order = object.morphTargetForcedOrder;
			var influences = object.morphTargetInfluences;

			var attribute;

			while ( m < material.numSupportedMorphTargets && m < order.length ) {

				attribute = attributes[ 'morphTarget' + m ];

				if ( attribute >= 0 ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ order[ m ] ] );

					state.enableAttribute( attribute );

					_gl.vertexAttribPointer( attribute, 3, _gl.FLOAT, false, 0, 0 );

				}

				attribute = attributes[ 'morphNormal' + m ];

				if ( attribute >= 0 && material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ order[ m ] ] );

					state.enableAttribute( attribute );

					_gl.vertexAttribPointer( attribute, 3, _gl.FLOAT, false, 0, 0 );

				}

				object.__webglMorphTargetInfluences[ m ] = influences[ order[ m ] ];

				m ++;

			}

		} else {

			// find the most influencing

			var activeInfluenceIndices = [];
			var influences = object.morphTargetInfluences;
			var morphTargets = object.geometry.morphTargets;

			if ( influences.length > morphTargets.length ) {

				console.warn( 'THREE.WebGLRenderer: Influences array is bigger than morphTargets array.' );
				influences.length = morphTargets.length;

			}

			for ( var i = 0, il = influences.length; i < il; i ++ ) {

				var influence = influences[ i ];

				activeInfluenceIndices.push( [ influence, i ] );

			}

			if ( activeInfluenceIndices.length > material.numSupportedMorphTargets ) {

				activeInfluenceIndices.sort( numericalSort );
				activeInfluenceIndices.length = material.numSupportedMorphTargets;

			} else if ( activeInfluenceIndices.length > material.numSupportedMorphNormals ) {

				activeInfluenceIndices.sort( numericalSort );

			} else if ( activeInfluenceIndices.length === 0 ) {

				activeInfluenceIndices.push( [ 0, 0 ] );

			}

			var attribute;

			for ( var m = 0, ml = material.numSupportedMorphTargets; m < ml; m ++ ) {

				if ( activeInfluenceIndices[ m ] ) {

					var influenceIndex = activeInfluenceIndices[ m ][ 1 ];

					attribute = attributes[ 'morphTarget' + m ];

					if ( attribute >= 0 ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ influenceIndex ] );

						state.enableAttribute( attribute );

						_gl.vertexAttribPointer( attribute, 3, _gl.FLOAT, false, 0, 0 );

					}

					attribute = attributes[ 'morphNormal' + m ];

					if ( attribute >= 0 && material.morphNormals ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ influenceIndex ] );

						state.enableAttribute( attribute );

						_gl.vertexAttribPointer( attribute, 3, _gl.FLOAT, false, 0, 0 );

					}

					object.__webglMorphTargetInfluences[ m ] = influences[ influenceIndex ];

				} else {

					/*
					_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

					if ( material.morphNormals ) {

						_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

					}
					*/

					object.__webglMorphTargetInfluences[ m ] = 0;

				}

			}

		}

		// load updated influences uniform

		if ( material.program.uniforms.morphTargetInfluences !== null ) {

			_gl.uniform1fv( material.program.uniforms.morphTargetInfluences, object.__webglMorphTargetInfluences );

		}

	}