function refreshUniformsDash( uniforms, material ) {

    		uniforms.dashSize.value = material.dashSize;
    		uniforms.totalSize.value = material.dashSize + material.gapSize;
    		uniforms.scale.value = material.scale;

    	}