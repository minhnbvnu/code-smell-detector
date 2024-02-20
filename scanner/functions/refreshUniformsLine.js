function refreshUniformsLine( uniforms, material ) {

    		uniforms.diffuse.value.copy( material.color );
    		uniforms.opacity.value = material.opacity;

    	}