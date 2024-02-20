function refreshUniformsPhysical( uniforms, material, transmissionRenderTarget ) {

    		refreshUniformsStandard( uniforms, material );

    		uniforms.ior.value = material.ior; // also part of uniforms common

    		if ( material.sheen > 0 ) {

    			uniforms.sheenColor.value.copy( material.sheenColor ).multiplyScalar( material.sheen );

    			uniforms.sheenRoughness.value = material.sheenRoughness;

    			if ( material.sheenColorMap ) {

    				uniforms.sheenColorMap.value = material.sheenColorMap;

    			}

    			if ( material.sheenRoughnessMap ) {

    				uniforms.sheenRoughnessMap.value = material.sheenRoughnessMap;

    			}

    		}

    		if ( material.clearcoat > 0 ) {

    			uniforms.clearcoat.value = material.clearcoat;
    			uniforms.clearcoatRoughness.value = material.clearcoatRoughness;

    			if ( material.clearcoatMap ) {

    				uniforms.clearcoatMap.value = material.clearcoatMap;

    			}

    			if ( material.clearcoatRoughnessMap ) {

    				uniforms.clearcoatRoughnessMap.value = material.clearcoatRoughnessMap;

    			}

    			if ( material.clearcoatNormalMap ) {

    				uniforms.clearcoatNormalScale.value.copy( material.clearcoatNormalScale );
    				uniforms.clearcoatNormalMap.value = material.clearcoatNormalMap;

    				if ( material.side === BackSide ) {

    					uniforms.clearcoatNormalScale.value.negate();

    				}

    			}

    		}

    		if ( material.transmission > 0 ) {

    			uniforms.transmission.value = material.transmission;
    			uniforms.transmissionSamplerMap.value = transmissionRenderTarget.texture;
    			uniforms.transmissionSamplerSize.value.set( transmissionRenderTarget.width, transmissionRenderTarget.height );

    			if ( material.transmissionMap ) {

    				uniforms.transmissionMap.value = material.transmissionMap;

    			}

    			uniforms.thickness.value = material.thickness;

    			if ( material.thicknessMap ) {

    				uniforms.thicknessMap.value = material.thicknessMap;

    			}

    			uniforms.attenuationDistance.value = material.attenuationDistance;
    			uniforms.attenuationColor.value.copy( material.attenuationColor );

    		}

    		uniforms.specularIntensity.value = material.specularIntensity;
    		uniforms.specularColor.value.copy( material.specularColor );

    		if ( material.specularIntensityMap ) {

    			uniforms.specularIntensityMap.value = material.specularIntensityMap;

    		}

    		if ( material.specularColorMap ) {

    			uniforms.specularColorMap.value = material.specularColorMap;

    		}

    	}