function refreshUniformsDepth( uniforms, material ) {

    		if ( material.displacementMap ) {

    			uniforms.displacementMap.value = material.displacementMap;
    			uniforms.displacementScale.value = material.displacementScale;
    			uniforms.displacementBias.value = material.displacementBias;

    		}

    	}