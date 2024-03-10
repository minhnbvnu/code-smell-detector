function setProgram( camera, scene, geometry, material, object ) {

    		if ( scene.isScene !== true ) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

    		textures.resetTextureUnits();

    		const fog = scene.fog;
    		const environment = material.isMeshStandardMaterial ? scene.environment : null;
    		const encoding = ( _currentRenderTarget === null ) ? _this.outputEncoding : _currentRenderTarget.texture.encoding;
    		const envMap = ( material.isMeshStandardMaterial ? cubeuvmaps : cubemaps ).get( material.envMap || environment );
    		const vertexAlphas = material.vertexColors === true && !! geometry.attributes.color && geometry.attributes.color.itemSize === 4;
    		const vertexTangents = !! material.normalMap && !! geometry.attributes.tangent;
    		const morphTargets = !! geometry.morphAttributes.position;
    		const morphNormals = !! geometry.morphAttributes.normal;
    		const morphTargetsCount = !! geometry.morphAttributes.position ? geometry.morphAttributes.position.length : 0;

    		const materialProperties = properties.get( material );
    		const lights = currentRenderState.state.lights;

    		if ( _clippingEnabled === true ) {

    			if ( _localClippingEnabled === true || camera !== _currentCamera ) {

    				const useCache =
    					camera === _currentCamera &&
    					material.id === _currentMaterialId;

    				// we might want to call this function with some ClippingGroup
    				// object instead of the material, once it becomes feasible
    				// (#8465, #8379)
    				clipping.setState( material, camera, useCache );

    			}

    		}

    		//

    		let needsProgramChange = false;

    		if ( material.version === materialProperties.__version ) {

    			if ( materialProperties.needsLights && ( materialProperties.lightsStateVersion !== lights.state.version ) ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.outputEncoding !== encoding ) {

    				needsProgramChange = true;

    			} else if ( object.isInstancedMesh && materialProperties.instancing === false ) {

    				needsProgramChange = true;

    			} else if ( ! object.isInstancedMesh && materialProperties.instancing === true ) {

    				needsProgramChange = true;

    			} else if ( object.isSkinnedMesh && materialProperties.skinning === false ) {

    				needsProgramChange = true;

    			} else if ( ! object.isSkinnedMesh && materialProperties.skinning === true ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.envMap !== envMap ) {

    				needsProgramChange = true;

    			} else if ( material.fog && materialProperties.fog !== fog ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.numClippingPlanes !== undefined &&
    				( materialProperties.numClippingPlanes !== clipping.numPlanes ||
    				materialProperties.numIntersection !== clipping.numIntersection ) ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.vertexAlphas !== vertexAlphas ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.vertexTangents !== vertexTangents ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.morphTargets !== morphTargets ) {

    				needsProgramChange = true;

    			} else if ( materialProperties.morphNormals !== morphNormals ) {

    				needsProgramChange = true;

    			} else if ( capabilities.isWebGL2 === true && materialProperties.morphTargetsCount !== morphTargetsCount ) {

    				needsProgramChange = true;

    			}

    		} else {

    			needsProgramChange = true;
    			materialProperties.__version = material.version;

    		}

    		//

    		let program = materialProperties.currentProgram;

    		if ( needsProgramChange === true ) {

    			program = getProgram( material, scene, object );

    		}

    		let refreshProgram = false;
    		let refreshMaterial = false;
    		let refreshLights = false;

    		const p_uniforms = program.getUniforms(),
    			m_uniforms = materialProperties.uniforms;

    		if ( state.useProgram( program.program ) ) {

    			refreshProgram = true;
    			refreshMaterial = true;
    			refreshLights = true;

    		}

    		if ( material.id !== _currentMaterialId ) {

    			_currentMaterialId = material.id;

    			refreshMaterial = true;

    		}

    		if ( refreshProgram || _currentCamera !== camera ) {

    			p_uniforms.setValue( _gl, 'projectionMatrix', camera.projectionMatrix );

    			if ( capabilities.logarithmicDepthBuffer ) {

    				p_uniforms.setValue( _gl, 'logDepthBufFC',
    					2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );

    			}

    			if ( _currentCamera !== camera ) {

    				_currentCamera = camera;

    				// lighting uniforms depend on the camera so enforce an update
    				// now, in case this material supports lights - or later, when
    				// the next material that does gets activated:

    				refreshMaterial = true;		// set to true on material change
    				refreshLights = true;		// remains set until update done

    			}

    			// load material specific uniforms
    			// (shader material also gets them for the sake of genericity)

    			if ( material.isShaderMaterial ||
    				material.isMeshPhongMaterial ||
    				material.isMeshToonMaterial ||
    				material.isMeshStandardMaterial ||
    				material.envMap ) {

    				const uCamPos = p_uniforms.map.cameraPosition;

    				if ( uCamPos !== undefined ) {

    					uCamPos.setValue( _gl,
    						_vector3.setFromMatrixPosition( camera.matrixWorld ) );

    				}

    			}

    			if ( material.isMeshPhongMaterial ||
    				material.isMeshToonMaterial ||
    				material.isMeshLambertMaterial ||
    				material.isMeshBasicMaterial ||
    				material.isMeshStandardMaterial ||
    				material.isShaderMaterial ) {

    				p_uniforms.setValue( _gl, 'isOrthographic', camera.isOrthographicCamera === true );

    			}

    			if ( material.isMeshPhongMaterial ||
    				material.isMeshToonMaterial ||
    				material.isMeshLambertMaterial ||
    				material.isMeshBasicMaterial ||
    				material.isMeshStandardMaterial ||
    				material.isShaderMaterial ||
    				material.isShadowMaterial ||
    				object.isSkinnedMesh ) {

    				p_uniforms.setValue( _gl, 'viewMatrix', camera.matrixWorldInverse );

    			}

    		}

    		// skinning and morph target uniforms must be set even if material didn't change
    		// auto-setting of texture unit for bone and morph texture must go before other textures
    		// otherwise textures used for skinning and morphing can take over texture units reserved for other material textures

    		if ( object.isSkinnedMesh ) {

    			p_uniforms.setOptional( _gl, object, 'bindMatrix' );
    			p_uniforms.setOptional( _gl, object, 'bindMatrixInverse' );

    			const skeleton = object.skeleton;

    			if ( skeleton ) {

    				if ( capabilities.floatVertexTextures ) {

    					if ( skeleton.boneTexture === null ) skeleton.computeBoneTexture();

    					p_uniforms.setValue( _gl, 'boneTexture', skeleton.boneTexture, textures );
    					p_uniforms.setValue( _gl, 'boneTextureSize', skeleton.boneTextureSize );

    				} else {

    					p_uniforms.setOptional( _gl, skeleton, 'boneMatrices' );

    				}

    			}

    		}

    		if ( !! geometry && ( geometry.morphAttributes.position !== undefined || geometry.morphAttributes.normal !== undefined ) ) {

    			morphtargets.update( object, geometry, material, program );

    		}


    		if ( refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow ) {

    			materialProperties.receiveShadow = object.receiveShadow;
    			p_uniforms.setValue( _gl, 'receiveShadow', object.receiveShadow );

    		}

    		if ( refreshMaterial ) {

    			p_uniforms.setValue( _gl, 'toneMappingExposure', _this.toneMappingExposure );

    			if ( materialProperties.needsLights ) {

    				// the current material requires lighting info

    				// note: all lighting uniforms are always set correctly
    				// they simply reference the renderer's state for their
    				// values
    				//
    				// use the current material's .needsUpdate flags to set
    				// the GL state when required

    				markUniformsLightsNeedsUpdate( m_uniforms, refreshLights );

    			}

    			// refresh uniforms common to several materials

    			if ( fog && material.fog ) {

    				materials.refreshFogUniforms( m_uniforms, fog );

    			}

    			materials.refreshMaterialUniforms( m_uniforms, material, _pixelRatio, _height, _transmissionRenderTarget );

    			WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, textures );

    		}

    		if ( material.isShaderMaterial && material.uniformsNeedUpdate === true ) {

    			WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, textures );
    			material.uniformsNeedUpdate = false;

    		}

    		if ( material.isSpriteMaterial ) {

    			p_uniforms.setValue( _gl, 'center', object.center );

    		}

    		// common matrices

    		p_uniforms.setValue( _gl, 'modelViewMatrix', object.modelViewMatrix );
    		p_uniforms.setValue( _gl, 'normalMatrix', object.normalMatrix );
    		p_uniforms.setValue( _gl, 'modelMatrix', object.matrixWorld );

    		return program;

    	}