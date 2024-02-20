function getUniforms( material ) {

    		const shaderID = shaderIDs[ material.type ];
    		let uniforms;

    		if ( shaderID ) {

    			const shader = ShaderLib[ shaderID ];
    			uniforms = UniformsUtils.clone( shader.uniforms );

    		} else {

    			uniforms = material.uniforms;

    		}

    		return uniforms;

    	}