function refreshUniformsDistance( uniforms, material ) {

    		if ( material.displacementMap ) {

    			uniforms.displacementMap.value = material.displacementMap;
    			uniforms.displacementScale.value = material.displacementScale;
    			uniforms.displacementBias.value = material.displacementBias;

    		}

    		uniforms.referencePosition.value.copy( material.referencePosition );
    		uniforms.nearDistance.value = material.nearDistance;
    		uniforms.farDistance.value = material.farDistance;

    	}