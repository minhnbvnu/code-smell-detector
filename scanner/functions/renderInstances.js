function renderInstances( start, count, primcount ) {

    		if ( primcount === 0 ) return;

    		let extension, methodName;

    		if ( isWebGL2 ) {

    			extension = gl;
    			methodName = 'drawElementsInstanced';

    		} else {

    			extension = extensions.get( 'ANGLE_instanced_arrays' );
    			methodName = 'drawElementsInstancedANGLE';

    			if ( extension === null ) {

    				console.error( 'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
    				return;

    			}

    		}

    		extension[ methodName ]( mode, count, type, start * bytesPerElement, primcount );

    		info.update( count, mode, primcount );

    	}