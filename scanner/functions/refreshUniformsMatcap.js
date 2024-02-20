function refreshUniformsMatcap( uniforms, material ) {

    		if ( material.matcap ) {

    			uniforms.matcap.value = material.matcap;

    		}

    		if ( material.bumpMap ) {

    			uniforms.bumpMap.value = material.bumpMap;
    			uniforms.bumpScale.value = material.bumpScale;
    			if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

    		}

    		if ( material.normalMap ) {

    			uniforms.normalMap.value = material.normalMap;
    			uniforms.normalScale.value.copy( material.normalScale );
    			if ( material.side === BackSide ) uniforms.normalScale.value.negate();

    		}

    		if ( material.displacementMap ) {

    			uniforms.displacementMap.value = material.displacementMap;
    			uniforms.displacementScale.value = material.displacementScale;
    			uniforms.displacementBias.value = material.displacementBias;

    		}

    	}