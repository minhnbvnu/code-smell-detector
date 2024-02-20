function refreshUniformsPhong( uniforms, material ) {

    		uniforms.specular.value.copy( material.specular );
    		uniforms.shininess.value = Math.max( material.shininess, 1e-4 ); // to prevent pow( 0.0, 0.0 )

    		if ( material.emissiveMap ) {

    			uniforms.emissiveMap.value = material.emissiveMap;

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