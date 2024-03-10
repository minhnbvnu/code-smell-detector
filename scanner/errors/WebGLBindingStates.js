    	function vertexAttribPointer( index, size, type, normalized, stride, offset ) {
    	function setupVertexAttributes( object, material, program, geometry ) {

    		if ( capabilities.isWebGL2 === false && ( object.isInstancedMesh || geometry.isInstancedBufferGeometry ) ) {

    			if ( extensions.get( 'ANGLE_instanced_arrays' ) === null ) return;

    		}

    		initAttributes();

    		const geometryAttributes = geometry.attributes;

    		const programAttributes = program.getAttributes();

    		const materialDefaultAttributeValues = material.defaultAttributeValues;

    		for ( const name in programAttributes ) {

    			const programAttribute = programAttributes[ name ];

    			if ( programAttribute.location >= 0 ) {

    				let geometryAttribute = geometryAttributes[ name ];

    				if ( geometryAttribute === undefined ) {

    					if ( name === 'instanceMatrix' && object.instanceMatrix ) geometryAttribute = object.instanceMatrix;
    					if ( name === 'instanceColor' && object.instanceColor ) geometryAttribute = object.instanceColor;

    				}

    				if ( geometryAttribute !== undefined ) {

    					const normalized = geometryAttribute.normalized;
    					const size = geometryAttribute.itemSize;

    					const attribute = attributes.get( geometryAttribute );

    					// TODO Attribute may not be available on context restore

    					if ( attribute === undefined ) continue;

    					const buffer = attribute.buffer;
    					const type = attribute.type;
    					const bytesPerElement = attribute.bytesPerElement;

    					if ( geometryAttribute.isInterleavedBufferAttribute ) {

    						const data = geometryAttribute.data;
    						const stride = data.stride;
    						const offset = geometryAttribute.offset;

    						if ( data && data.isInstancedInterleavedBuffer ) {

    							for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

    								enableAttributeAndDivisor( programAttribute.location + i, data.meshPerAttribute );

    							}

    							if ( object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined ) {

    								geometry._maxInstanceCount = data.meshPerAttribute * data.count;

    							}

    						} else {

    							for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

    								enableAttribute( programAttribute.location + i );

    							}

    						}

    						gl.bindBuffer( 34962, buffer );

    						for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

    							vertexAttribPointer(
    								programAttribute.location + i,
    								size / programAttribute.locationSize,
    								type,
    								normalized,
    								stride * bytesPerElement,
    								( offset + ( size / programAttribute.locationSize ) * i ) * bytesPerElement
    							);

    						}

    					} else {

    						if ( geometryAttribute.isInstancedBufferAttribute ) {

    							for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

    								enableAttributeAndDivisor( programAttribute.location + i, geometryAttribute.meshPerAttribute );

    							}

    							if ( object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined ) {

    								geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

    							}

    						} else {

    							for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

    								enableAttribute( programAttribute.location + i );

    							}

    						}

    						gl.bindBuffer( 34962, buffer );

    						for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

    							vertexAttribPointer(
    								programAttribute.location + i,
    								size / programAttribute.locationSize,
    								type,
    								normalized,
    								size * bytesPerElement,
    								( size / programAttribute.locationSize ) * i * bytesPerElement
    							);

    						}

    					}

    				} else if ( materialDefaultAttributeValues !== undefined ) {

    					const value = materialDefaultAttributeValues[ name ];

    					if ( value !== undefined ) {

    						switch ( value.length ) {

    							case 2:
    								gl.vertexAttrib2fv( programAttribute.location, value );
    								break;

    							case 3:
    								gl.vertexAttrib3fv( programAttribute.location, value );
    								break;

    							case 4:
    								gl.vertexAttrib4fv( programAttribute.location, value );
    								break;

    							default:
    								gl.vertexAttrib1fv( programAttribute.location, value );

    						}

    					}

    				}

    			}

    		}

    		disableUnusedAttributes();

    	}