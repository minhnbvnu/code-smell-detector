function setupGizmo( gizmoMap ) {

    			const gizmo = new Object3D();

    			for ( const name in gizmoMap ) {

    				for ( let i = gizmoMap[ name ].length; i --; ) {

    					const object = gizmoMap[ name ][ i ][ 0 ].clone();
    					const position = gizmoMap[ name ][ i ][ 1 ];
    					const rotation = gizmoMap[ name ][ i ][ 2 ];
    					const scale = gizmoMap[ name ][ i ][ 3 ];
    					const tag = gizmoMap[ name ][ i ][ 4 ];

    					// name and tag properties are essential for picking and updating logic.
    					object.name = name;
    					object.tag = tag;

    					if ( position ) {

    						object.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );

    					}

    					if ( rotation ) {

    						object.rotation.set( rotation[ 0 ], rotation[ 1 ], rotation[ 2 ] );

    					}

    					if ( scale ) {

    						object.scale.set( scale[ 0 ], scale[ 1 ], scale[ 2 ] );

    					}

    					object.updateMatrix();

    					const tempGeometry = object.geometry.clone();
    					tempGeometry.applyMatrix4( object.matrix );
    					object.geometry = tempGeometry;
    					object.renderOrder = Infinity;

    					object.position.set( 0, 0, 0 );
    					object.rotation.set( 0, 0, 0 );
    					object.scale.set( 1, 1, 1 );

    					gizmo.add( object );

    				}

    			}

    			return gizmo;

    		}