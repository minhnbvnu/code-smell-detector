function refreshUniformsPoints( uniforms, material, pixelRatio, height ) {

    		uniforms.diffuse.value.copy( material.color );
    		uniforms.opacity.value = material.opacity;
    		uniforms.size.value = material.size * pixelRatio;
    		uniforms.scale.value = height * 0.5;

    		if ( material.map ) {

    			uniforms.map.value = material.map;

    		}

    		if ( material.alphaMap ) {

    			uniforms.alphaMap.value = material.alphaMap;

    		}

    		if ( material.alphaTest > 0 ) {

    			uniforms.alphaTest.value = material.alphaTest;

    		}

    		// uv repeat and offset setting priorities
    		// 1. color map
    		// 2. alpha map

    		let uvScaleMap;

    		if ( material.map ) {

    			uvScaleMap = material.map;

    		} else if ( material.alphaMap ) {

    			uvScaleMap = material.alphaMap;

    		}

    		if ( uvScaleMap !== undefined ) {

    			if ( uvScaleMap.matrixAutoUpdate === true ) {

    				uvScaleMap.updateMatrix();

    			}

    			uniforms.uvTransform.value.copy( uvScaleMap.matrix );

    		}

    	}