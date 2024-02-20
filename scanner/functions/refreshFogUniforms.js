function refreshFogUniforms( uniforms, fog ) {

    		uniforms.fogColor.value.copy( fog.color );

    		if ( fog.isFog ) {

    			uniforms.fogNear.value = fog.near;
    			uniforms.fogFar.value = fog.far;

    		} else if ( fog.isFogExp2 ) {

    			uniforms.fogDensity.value = fog.density;

    		}

    	}