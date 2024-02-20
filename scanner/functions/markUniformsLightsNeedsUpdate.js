function markUniformsLightsNeedsUpdate( uniforms, value ) {

    		uniforms.ambientLightColor.needsUpdate = value;
    		uniforms.lightProbe.needsUpdate = value;

    		uniforms.directionalLights.needsUpdate = value;
    		uniforms.directionalLightShadows.needsUpdate = value;
    		uniforms.pointLights.needsUpdate = value;
    		uniforms.pointLightShadows.needsUpdate = value;
    		uniforms.spotLights.needsUpdate = value;
    		uniforms.spotLightShadows.needsUpdate = value;
    		uniforms.rectAreaLights.needsUpdate = value;
    		uniforms.hemisphereLights.needsUpdate = value;

    	}