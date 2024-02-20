function refreshUniformsStandard( uniforms, material ) {

    		uniforms.roughness.value = material.roughness;
    		uniforms.metalness.value = material.metalness;

    		if ( material.roughnessMap ) {

    			uniforms.roughnessMap.value = material.roughnessMap;

    		}

    		if ( material.metalnessMap ) {

    			uniforms.metalnessMap.value = material.metalnessMap;

    		}

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

    		const envMap = properties.get( material ).envMap;

    		if ( envMap ) {

    			//uniforms.envMap.value = material.envMap; // part of uniforms common
    			uniforms.envMapIntensity.value = material.envMapIntensity;

    		}

    	}