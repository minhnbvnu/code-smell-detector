function refreshMaterialUniforms( uniforms, material, pixelRatio, height, transmissionRenderTarget ) {

    		if ( material.isMeshBasicMaterial ) {

    			refreshUniformsCommon( uniforms, material );

    		} else if ( material.isMeshLambertMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsLambert( uniforms, material );

    		} else if ( material.isMeshToonMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsToon( uniforms, material );

    		} else if ( material.isMeshPhongMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsPhong( uniforms, material );

    		} else if ( material.isMeshStandardMaterial ) {

    			refreshUniformsCommon( uniforms, material );

    			if ( material.isMeshPhysicalMaterial ) {

    				refreshUniformsPhysical( uniforms, material, transmissionRenderTarget );

    			} else {

    				refreshUniformsStandard( uniforms, material );

    			}

    		} else if ( material.isMeshMatcapMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsMatcap( uniforms, material );

    		} else if ( material.isMeshDepthMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsDepth( uniforms, material );

    		} else if ( material.isMeshDistanceMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsDistance( uniforms, material );

    		} else if ( material.isMeshNormalMaterial ) {

    			refreshUniformsCommon( uniforms, material );
    			refreshUniformsNormal( uniforms, material );

    		} else if ( material.isLineBasicMaterial ) {

    			refreshUniformsLine( uniforms, material );

    			if ( material.isLineDashedMaterial ) {

    				refreshUniformsDash( uniforms, material );

    			}

    		} else if ( material.isPointsMaterial ) {

    			refreshUniformsPoints( uniforms, material, pixelRatio, height );

    		} else if ( material.isSpriteMaterial ) {

    			refreshUniformsSprites( uniforms, material );

    		} else if ( material.isShadowMaterial ) {

    			uniforms.color.value.copy( material.color );
    			uniforms.opacity.value = material.opacity;

    		} else if ( material.isShaderMaterial ) {

    			material.uniformsNeedUpdate = false; // #15581

    		}

    	}