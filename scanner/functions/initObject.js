function initObject( object ) {

		if ( object.__webglInit === undefined ) {

			object.__webglInit = true;
			object._modelViewMatrix = new THREE.Matrix4();
			object._normalMatrix = new THREE.Matrix3();

			object.addEventListener( 'removed', onObjectRemoved );

		}

		var geometry = object.geometry;

		if ( geometry === undefined ) {

			// ImmediateRenderObject

		} else if ( geometry.__webglInit === undefined ) {

			geometry.__webglInit = true;
			geometry.addEventListener( 'dispose', onGeometryDispose );

			if ( geometry instanceof THREE.BufferGeometry ) {

				_this.info.memory.geometries ++;

			} else if ( object instanceof THREE.Mesh ) {

				initGeometryGroups( object, geometry );

			} else if ( object instanceof THREE.Line ) {

				if ( geometry.__webglVertexBuffer === undefined ) {

					createLineBuffers( geometry );
					initLineBuffers( geometry, object );

					geometry.verticesNeedUpdate = true;
					geometry.colorsNeedUpdate = true;
					geometry.lineDistancesNeedUpdate = true;

				}

			} else if ( object instanceof THREE.PointCloud ) {

				if ( geometry.__webglVertexBuffer === undefined ) {

					createParticleBuffers( geometry );
					initParticleBuffers( geometry, object );

					geometry.verticesNeedUpdate = true;
					geometry.colorsNeedUpdate = true;

				}

			}

		}

		if ( object.__webglActive === undefined) {

			object.__webglActive = true;

			if ( object instanceof THREE.Mesh ) {

				if ( geometry instanceof THREE.BufferGeometry ) {

					addBuffer( _webglObjects, geometry, object );

				} else if ( geometry instanceof THREE.Geometry ) {

					var geometryGroupsList = geometryGroups[ geometry.id ];

					for ( var i = 0,l = geometryGroupsList.length; i < l; i ++ ) {

						addBuffer( _webglObjects, geometryGroupsList[ i ], object );

					}

				}

			} else if ( object instanceof THREE.Line || object instanceof THREE.PointCloud ) {

				addBuffer( _webglObjects, geometry, object );

			} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

				addBufferImmediate( _webglObjectsImmediate, object );

			}

		}

	}