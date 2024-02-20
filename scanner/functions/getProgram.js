function getProgram( material, scene, object ) {

    		if ( scene.isScene !== true ) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

    		const materialProperties = properties.get( material );

    		const lights = currentRenderState.state.lights;
    		const shadowsArray = currentRenderState.state.shadowsArray;

    		const lightsStateVersion = lights.state.version;

    		const parameters = programCache.getParameters( material, lights.state, shadowsArray, scene, object );
    		const programCacheKey = programCache.getProgramCacheKey( parameters );

    		let programs = materialProperties.programs;

    		// always update environment and fog - changing these trigger an getProgram call, but it's possible that the program doesn't change

    		materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
    		materialProperties.fog = scene.fog;
    		materialProperties.envMap = ( material.isMeshStandardMaterial ? cubeuvmaps : cubemaps ).get( material.envMap || materialProperties.environment );

    		if ( programs === undefined ) {

    			// new material

    			material.addEventListener( 'dispose', onMaterialDispose );

    			programs = new Map();
    			materialProperties.programs = programs;

    		}

    		let program = programs.get( programCacheKey );

    		if ( program !== undefined ) {

    			// early out if program and light state is identical

    			if ( materialProperties.currentProgram === program && materialProperties.lightsStateVersion === lightsStateVersion ) {

    				updateCommonMaterialProperties( material, parameters );

    				return program;

    			}

    		} else {

    			parameters.uniforms = programCache.getUniforms( material );

    			material.onBuild( object, parameters, _this );

    			material.onBeforeCompile( parameters, _this );

    			program = programCache.acquireProgram( parameters, programCacheKey );
    			programs.set( programCacheKey, program );

    			materialProperties.uniforms = parameters.uniforms;

    		}

    		const uniforms = materialProperties.uniforms;

    		if ( ( ! material.isShaderMaterial && ! material.isRawShaderMaterial ) || material.clipping === true ) {

    			uniforms.clippingPlanes = clipping.uniform;

    		}

    		updateCommonMaterialProperties( material, parameters );

    		// store the light setup it was created for

    		materialProperties.needsLights = materialNeedsLights( material );
    		materialProperties.lightsStateVersion = lightsStateVersion;

    		if ( materialProperties.needsLights ) {

    			// wire up the material to this renderer's lighting state

    			uniforms.ambientLightColor.value = lights.state.ambient;
    			uniforms.lightProbe.value = lights.state.probe;
    			uniforms.directionalLights.value = lights.state.directional;
    			uniforms.directionalLightShadows.value = lights.state.directionalShadow;
    			uniforms.spotLights.value = lights.state.spot;
    			uniforms.spotLightShadows.value = lights.state.spotShadow;
    			uniforms.rectAreaLights.value = lights.state.rectArea;
    			uniforms.ltc_1.value = lights.state.rectAreaLTC1;
    			uniforms.ltc_2.value = lights.state.rectAreaLTC2;
    			uniforms.pointLights.value = lights.state.point;
    			uniforms.pointLightShadows.value = lights.state.pointShadow;
    			uniforms.hemisphereLights.value = lights.state.hemi;

    			uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
    			uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
    			uniforms.spotShadowMap.value = lights.state.spotShadowMap;
    			uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
    			uniforms.pointShadowMap.value = lights.state.pointShadowMap;
    			uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
    			// TODO (abelnation): add area lights shadow info to uniforms

    		}

    		const progUniforms = program.getUniforms();
    		const uniformsList = WebGLUniforms.seqWithValue( progUniforms.seq, uniforms );

    		materialProperties.currentProgram = program;
    		materialProperties.uniformsList = uniformsList;

    		return program;

    	}