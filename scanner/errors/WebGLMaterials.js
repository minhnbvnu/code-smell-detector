    	function refreshUniformsCommon( uniforms, material ) {

    		uniforms.opacity.value = material.opacity;

    		if ( material.color ) {

    			uniforms.diffuse.value.copy( material.color );

    		}

    		if ( material.emissive ) {

    			uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

    		}

    		if ( material.map ) {

    			uniforms.map.value = material.map;

    		}

    		if ( material.alphaMap ) {

    			uniforms.alphaMap.value = material.alphaMap;

    		}

    		if ( material.specularMap ) {

    			uniforms.specularMap.value = material.specularMap;

    		}

    		if ( material.alphaTest > 0 ) {

    			uniforms.alphaTest.value = material.alphaTest;

    		}

    		const envMap = properties.get( material ).envMap;

    		if ( envMap ) {

    			uniforms.envMap.value = envMap;

    			uniforms.flipEnvMap.value = ( envMap.isCubeTexture && envMap.isRenderTargetTexture === false ) ? - 1 : 1;

    			uniforms.reflectivity.value = material.reflectivity;
    			uniforms.ior.value = material.ior;
    			uniforms.refractionRatio.value = material.refractionRatio;

    		}

    		if ( material.lightMap ) {

    			uniforms.lightMap.value = material.lightMap;
    			uniforms.lightMapIntensity.value = material.lightMapIntensity;

    		}

    		if ( material.aoMap ) {

    			uniforms.aoMap.value = material.aoMap;
    			uniforms.aoMapIntensity.value = material.aoMapIntensity;

    		}

    		// uv repeat and offset setting priorities
    		// 1. color map
    		// 2. specular map
    		// 3. displacementMap map
    		// 4. normal map
    		// 5. bump map
    		// 6. roughnessMap map
    		// 7. metalnessMap map
    		// 8. alphaMap map
    		// 9. emissiveMap map
    		// 10. clearcoat map
    		// 11. clearcoat normal map
    		// 12. clearcoat roughnessMap map
    		// 13. specular intensity map
    		// 14. specular tint map
    		// 15. transmission map
    		// 16. thickness map

    		let uvScaleMap;

    		if ( material.map ) {

    			uvScaleMap = material.map;

    		} else if ( material.specularMap ) {

    			uvScaleMap = material.specularMap;

    		} else if ( material.displacementMap ) {

    			uvScaleMap = material.displacementMap;

    		} else if ( material.normalMap ) {

    			uvScaleMap = material.normalMap;

    		} else if ( material.bumpMap ) {

    			uvScaleMap = material.bumpMap;

    		} else if ( material.roughnessMap ) {

    			uvScaleMap = material.roughnessMap;

    		} else if ( material.metalnessMap ) {

    			uvScaleMap = material.metalnessMap;

    		} else if ( material.alphaMap ) {

    			uvScaleMap = material.alphaMap;

    		} else if ( material.emissiveMap ) {

    			uvScaleMap = material.emissiveMap;

    		} else if ( material.clearcoatMap ) {

    			uvScaleMap = material.clearcoatMap;

    		} else if ( material.clearcoatNormalMap ) {

    			uvScaleMap = material.clearcoatNormalMap;

    		} else if ( material.clearcoatRoughnessMap ) {

    			uvScaleMap = material.clearcoatRoughnessMap;

    		} else if ( material.specularIntensityMap ) {

    			uvScaleMap = material.specularIntensityMap;

    		} else if ( material.specularColorMap ) {

    			uvScaleMap = material.specularColorMap;

    		} else if ( material.transmissionMap ) {

    			uvScaleMap = material.transmissionMap;

    		} else if ( material.thicknessMap ) {

    			uvScaleMap = material.thicknessMap;

    		} else if ( material.sheenColorMap ) {

    			uvScaleMap = material.sheenColorMap;

    		} else if ( material.sheenRoughnessMap ) {

    			uvScaleMap = material.sheenRoughnessMap;

    		}

    		if ( uvScaleMap !== undefined ) {

    			// backwards compatibility
    			if ( uvScaleMap.isWebGLRenderTarget ) {

    				uvScaleMap = uvScaleMap.texture;

    			}

    			if ( uvScaleMap.matrixAutoUpdate === true ) {

    				uvScaleMap.updateMatrix();

    			}

    			uniforms.uvTransform.value.copy( uvScaleMap.matrix );

    		}

    		// uv repeat and offset setting priorities for uv2
    		// 1. ao map
    		// 2. light map

    		let uv2ScaleMap;

    		if ( material.aoMap ) {

    			uv2ScaleMap = material.aoMap;

    		} else if ( material.lightMap ) {

    			uv2ScaleMap = material.lightMap;

    		}

    		if ( uv2ScaleMap !== undefined ) {

    			// backwards compatibility
    			if ( uv2ScaleMap.isWebGLRenderTarget ) {

    				uv2ScaleMap = uv2ScaleMap.texture;

    			}

    			if ( uv2ScaleMap.matrixAutoUpdate === true ) {

    				uv2ScaleMap.updateMatrix();

    			}

    			uniforms.uv2Transform.value.copy( uv2ScaleMap.matrix );

    		}

    	}