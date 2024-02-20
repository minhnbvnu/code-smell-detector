function initMaterial(material, fog, object) {

    var materialProperties = properties.get(material);

    var lights = currentRenderState.state.lights;
    var shadowsArray = currentRenderState.state.shadowsArray;

    var lightsHash = materialProperties.lightsHash;
    var lightsStateHash = lights.state.hash;

    var parameters = programCache.getParameters(
      material, lights.state, shadowsArray, fog, _clipping.numPlanes, _clipping.numIntersection, object);

    var code = programCache.getProgramCode(material, parameters);

    var program = materialProperties.program;
    var programChange = true;

    if (program === undefined) {

      // new material
      material.addEventListener('dispose', onMaterialDispose);

    } else if (program.code !== code) {

      // changed glsl or parameters
      releaseMaterialProgramReference(material);

    } else if (lightsHash.stateID !== lightsStateHash.stateID ||
      lightsHash.directionalLength !== lightsStateHash.directionalLength ||
      lightsHash.pointLength !== lightsStateHash.pointLength ||
      lightsHash.spotLength !== lightsStateHash.spotLength ||
      lightsHash.rectAreaLength !== lightsStateHash.rectAreaLength ||
      lightsHash.hemiLength !== lightsStateHash.hemiLength ||
      lightsHash.shadowsLength !== lightsStateHash.shadowsLength) {

      lightsHash.stateID = lightsStateHash.stateID;
      lightsHash.directionalLength = lightsStateHash.directionalLength;
      lightsHash.pointLength = lightsStateHash.pointLength;
      lightsHash.spotLength = lightsStateHash.spotLength;
      lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
      lightsHash.hemiLength = lightsStateHash.hemiLength;
      lightsHash.shadowsLength = lightsStateHash.shadowsLength;

      programChange = false;

    } else if (parameters.shaderID !== undefined) {

      // same glsl and uniform list
      return;

    } else {

      // only rebuild uniform list
      programChange = false;

    }

    if (programChange) {

      if (parameters.shaderID) {

        var shader = ShaderLib[parameters.shaderID];

        materialProperties.shader = {
          name: material.type,
          uniforms: UniformsUtils.clone(shader.uniforms),
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader
        };

      } else {

        materialProperties.shader = {
          name: material.type,
          uniforms: material.uniforms,
          vertexShader: material.vertexShader,
          fragmentShader: material.fragmentShader
        };

      }

      material.onBeforeCompile(materialProperties.shader, _this);

      // Computing code again as onBeforeCompile may have changed the shaders
      code = programCache.getProgramCode(material, parameters);

      program = programCache.acquireProgram(material, materialProperties.shader, parameters, code);

      materialProperties.program = program;
      material.program = program;

    }

    var programAttributes = program.getAttributes();

    if (material.morphTargets) {

      material.numSupportedMorphTargets = 0;

      for (var i = 0; i < _this.maxMorphTargets; i++) {

        if (programAttributes['morphTarget' + i] >= 0) {

          material.numSupportedMorphTargets++;

        }

      }

    }

    if (material.morphNormals) {

      material.numSupportedMorphNormals = 0;

      for (var i = 0; i < _this.maxMorphNormals; i++) {

        if (programAttributes['morphNormal' + i] >= 0) {

          material.numSupportedMorphNormals++;

        }

      }

    }

    var uniforms = materialProperties.shader.uniforms;

    if (!material.isShaderMaterial &&
      !material.isRawShaderMaterial ||
      material.clipping === true) {

      materialProperties.numClippingPlanes = _clipping.numPlanes;
      materialProperties.numIntersection = _clipping.numIntersection;
      uniforms.clippingPlanes = _clipping.uniform;

    }

    materialProperties.fog = fog;

    // store the light setup it was created for
    if (lightsHash === undefined) {

      materialProperties.lightsHash = lightsHash = {};

    }

    lightsHash.stateID = lightsStateHash.stateID;
    lightsHash.directionalLength = lightsStateHash.directionalLength;
    lightsHash.pointLength = lightsStateHash.pointLength;
    lightsHash.spotLength = lightsStateHash.spotLength;
    lightsHash.rectAreaLength = lightsStateHash.rectAreaLength;
    lightsHash.hemiLength = lightsStateHash.hemiLength;
    lightsHash.shadowsLength = lightsStateHash.shadowsLength;

    if (material.lights) {

      // wire up the material to this renderer's lighting state

      uniforms.ambientLightColor.value = lights.state.ambient;
      uniforms.directionalLights.value = lights.state.directional;
      uniforms.spotLights.value = lights.state.spot;
      uniforms.rectAreaLights.value = lights.state.rectArea;
      uniforms.pointLights.value = lights.state.point;
      uniforms.hemisphereLights.value = lights.state.hemi;

      uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
      uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
      uniforms.spotShadowMap.value = lights.state.spotShadowMap;
      uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
      uniforms.pointShadowMap.value = lights.state.pointShadowMap;
      uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
      // TODO (abelnation): add area lights shadow info to uniforms

    }

    var progUniforms = materialProperties.program.getUniforms(),
      uniformsList =
      WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);

    materialProperties.uniformsList = uniformsList;

  }