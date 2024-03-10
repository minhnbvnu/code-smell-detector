function projectObject( object, camera, groupOrder, sortObjects ) {

    		if ( object.visible === false ) return;

    		const visible = object.layers.test( camera.layers );

    		if ( visible ) {

    			if ( object.isGroup ) {

    				groupOrder = object.renderOrder;

    			} else if ( object.isLOD ) {

    				if ( object.autoUpdate === true ) object.update( camera );

    			} else if ( object.isLight ) {

    				currentRenderState.pushLight( object );

    				if ( object.castShadow ) {

    					currentRenderState.pushShadow( object );

    				}

    			} else if ( object.isSprite ) {

    				if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

    					if ( sortObjects ) {

    						_vector3.setFromMatrixPosition( object.matrixWorld )
    							.applyMatrix4( _projScreenMatrix );

    					}

    					const geometry = objects.update( object );
    					const material = object.material;

    					if ( material.visible ) {

    						currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

    					}

    				}

    			} else if ( object.isMesh || object.isLine || object.isPoints ) {

    				if ( object.isSkinnedMesh ) {

    					// update skeleton only once in a frame

    					if ( object.skeleton.frame !== info.render.frame ) {

    						object.skeleton.update();
    						object.skeleton.frame = info.render.frame;

    					}

    				}

    				if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

    					if ( sortObjects ) {

    						_vector3.setFromMatrixPosition( object.matrixWorld )
    							.applyMatrix4( _projScreenMatrix );

    					}

    					const geometry = objects.update( object );
    					const material = object.material;

    					if ( Array.isArray( material ) ) {

    						const groups = geometry.groups;

    						for ( let i = 0, l = groups.length; i < l; i ++ ) {

    							const group = groups[ i ];
    							const groupMaterial = material[ group.materialIndex ];

    							if ( groupMaterial && groupMaterial.visible ) {

    								currentRenderList.push( object, geometry, groupMaterial, groupOrder, _vector3.z, group );

    							}

    						}

    					} else if ( material.visible ) {

    						currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

    					}

    				}

    			}

    		}

    		const children = object.children;

    		for ( let i = 0, l = children.length; i < l; i ++ ) {

    			projectObject( children[ i ], camera, groupOrder, sortObjects );

    		}

    	}