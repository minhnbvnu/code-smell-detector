function VSMPass( shadow, camera ) {

    		const geometry = _objects.update( fullScreenMesh );

    		if ( shadowMaterialVertical.defines.VSM_SAMPLES !== shadow.blurSamples ) {

    			shadowMaterialVertical.defines.VSM_SAMPLES = shadow.blurSamples;
    			shadowMaterialHorizontal.defines.VSM_SAMPLES = shadow.blurSamples;

    			shadowMaterialVertical.needsUpdate = true;
    			shadowMaterialHorizontal.needsUpdate = true;

    		}

    		// vertical pass

    		shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
    		shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
    		shadowMaterialVertical.uniforms.radius.value = shadow.radius;
    		_renderer.setRenderTarget( shadow.mapPass );
    		_renderer.clear();
    		_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialVertical, fullScreenMesh, null );

    		// horizontal pass

    		shadowMaterialHorizontal.uniforms.shadow_pass.value = shadow.mapPass.texture;
    		shadowMaterialHorizontal.uniforms.resolution.value = shadow.mapSize;
    		shadowMaterialHorizontal.uniforms.radius.value = shadow.radius;
    		_renderer.setRenderTarget( shadow.map );
    		_renderer.clear();
    		_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialHorizontal, fullScreenMesh, null );

    	}