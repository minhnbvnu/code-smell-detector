    	this.renderBufferDirect = function ( camera, scene, geometry, material, object, group ) {

    		if ( scene === null ) scene = _emptyScene; // renderBufferDirect second parameter used to be fog (could be null)

    		const frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );

    		const program = setProgram( camera, scene, geometry, material, object );

    		state.setMaterial( material, frontFaceCW );

    		//

    		let index = geometry.index;
    		const position = geometry.attributes.position;

    		//

    		if ( index === null ) {

    			if ( position === undefined || position.count === 0 ) return;

    		} else if ( index.count === 0 ) {

    			return;

    		}

    		//

    		let rangeFactor = 1;

    		if ( material.wireframe === true ) {

    			index = geometries.getWireframeAttribute( geometry );
    			rangeFactor = 2;

    		}

    		bindingStates.setup( object, material, program, geometry, index );

    		let attribute;
    		let renderer = bufferRenderer;

    		if ( index !== null ) {

    			attribute = attributes.get( index );

    			renderer = indexedBufferRenderer;
    			renderer.setIndex( attribute );

    		}

    		//

    		const dataCount = ( index !== null ) ? index.count : position.count;

    		const rangeStart = geometry.drawRange.start * rangeFactor;
    		const rangeCount = geometry.drawRange.count * rangeFactor;

    		const groupStart = group !== null ? group.start * rangeFactor : 0;
    		const groupCount = group !== null ? group.count * rangeFactor : Infinity;

    		const drawStart = Math.max( rangeStart, groupStart );
    		const drawEnd = Math.min( dataCount, rangeStart + rangeCount, groupStart + groupCount ) - 1;

    		const drawCount = Math.max( 0, drawEnd - drawStart + 1 );

    		if ( drawCount === 0 ) return;

    		//

    		if ( object.isMesh ) {

    			if ( material.wireframe === true ) {

    				state.setLineWidth( material.wireframeLinewidth * getTargetPixelRatio() );
    				renderer.setMode( 1 );

    			} else {

    				renderer.setMode( 4 );

    			}

    		} else if ( object.isLine ) {

    			let lineWidth = material.linewidth;

    			if ( lineWidth === undefined ) lineWidth = 1; // Not using Line*Material

    			state.setLineWidth( lineWidth * getTargetPixelRatio() );

    			if ( object.isLineSegments ) {

    				renderer.setMode( 1 );

    			} else if ( object.isLineLoop ) {

    				renderer.setMode( 2 );

    			} else {

    				renderer.setMode( 3 );

    			}

    		} else if ( object.isPoints ) {

    			renderer.setMode( 0 );

    		} else if ( object.isSprite ) {

    			renderer.setMode( 4 );

    		}

    		if ( object.isInstancedMesh ) {

    			renderer.renderInstances( drawStart, drawCount, object.count );

    		} else if ( geometry.isInstancedBufferGeometry ) {

    			const instanceCount = Math.min( geometry.instanceCount, geometry._maxInstanceCount );

    			renderer.renderInstances( drawStart, drawCount, instanceCount );

    		} else {

    			renderer.render( drawStart, drawCount );

    		}

    	};
    	function projectObject( object, camera, groupOrder, sortObjects ) {

    		if ( object.visible === false ) return;

    		const visible = object.layers.test( camera.layers );

    		if ( visible ) {

    			if ( object.isGroup ) {

    				groupOrder = object.renderOrder;

    			} else if ( object.isLOD ) {

    				if ( object.autoUpdate === true ) object.update( camera );

    			} else if ( object.isLight ) {

    				currentRenderState.pushLight( object );

    				if ( object.castShadow ) {

    					currentRenderState.pushShadow( object );

    				}

    			} else if ( object.isSprite ) {

    				if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

    					if ( sortObjects ) {

    						_vector3.setFromMatrixPosition( object.matrixWorld )
    							.applyMatrix4( _projScreenMatrix );

    					}

    					const geometry = objects.update( object );
    					const material = object.material;

    					if ( material.visible ) {

    						currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

    					}

    				}

    			} else if ( object.isMesh || object.isLine || object.isPoints ) {

    				if ( object.isSkinnedMesh ) {

    					// update skeleton only once in a frame

    					if ( object.skeleton.frame !== info.render.frame ) {

    						object.skeleton.update();
    						object.skeleton.frame = info.render.frame;

    					}

    				}

    				if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

    					if ( sortObjects ) {

    						_vector3.setFromMatrixPosition( object.matrixWorld )
    							.applyMatrix4( _projScreenMatrix );

    					}

    					const geometry = objects.update( object );
    					const material = object.material;

    					if ( Array.isArray( material ) ) {

    						const groups = geometry.groups;

    						for ( let i = 0, l = groups.length; i < l; i ++ ) {

    							const group = groups[ i ];
    							const groupMaterial = material[ group.materialIndex ];

    							if ( groupMaterial && groupMaterial.visible ) {

    								currentRenderList.push( object, geometry, groupMaterial, groupOrder, _vector3.z, group );

    							}

    						}

    					} else if ( material.visible ) {

    						currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

    					}

    				}

    			}

    		}

    		const children = object.children;

    		for ( let i = 0, l = children.length; i < l; i ++ ) {

    			projectObject( children[ i ], camera, groupOrder, sortObjects );

    		}

    	}
    	function renderObject( object, scene, camera, geometry, material, group ) {
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
    	this.setRenderTarget = function ( renderTarget, activeCubeFace = 0, activeMipmapLevel = 0 ) {

    		_currentRenderTarget = renderTarget;
    		_currentActiveCubeFace = activeCubeFace;
    		_currentActiveMipmapLevel = activeMipmapLevel;
    		let useDefaultFramebuffer = true;

    		if ( renderTarget ) {

    			const renderTargetProperties = properties.get( renderTarget );

    			if ( renderTargetProperties.__useDefaultFramebuffer !== undefined ) {

    				// We need to make sure to rebind the framebuffer.
    				state.bindFramebuffer( 36160, null );
    				useDefaultFramebuffer = false;

    			} else if ( renderTargetProperties.__webglFramebuffer === undefined ) {

    				textures.setupRenderTarget( renderTarget );

    			} else if ( renderTargetProperties.__hasExternalTextures ) {

    				// Color and depth texture must be rebound in order for the swapchain to update.
    				textures.rebindTextures( renderTarget, properties.get( renderTarget.texture ).__webglTexture, properties.get( renderTarget.depthTexture ).__webglTexture );

    			}

    		}

    		let framebuffer = null;
    		let isCube = false;
    		let isRenderTarget3D = false;

    		if ( renderTarget ) {

    			const texture = renderTarget.texture;

    			if ( texture.isDataTexture3D || texture.isDataTexture2DArray ) {

    				isRenderTarget3D = true;

    			}

    			const __webglFramebuffer = properties.get( renderTarget ).__webglFramebuffer;

    			if ( renderTarget.isWebGLCubeRenderTarget ) {

    				framebuffer = __webglFramebuffer[ activeCubeFace ];
    				isCube = true;

    			} else if ( renderTarget.useRenderbuffer ) {

    				framebuffer = properties.get( renderTarget ).__webglMultisampledFramebuffer;

    			} else {

    				framebuffer = __webglFramebuffer;

    			}

    			_currentViewport.copy( renderTarget.viewport );
    			_currentScissor.copy( renderTarget.scissor );
    			_currentScissorTest = renderTarget.scissorTest;

    		} else {

    			_currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ).floor();
    			_currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ).floor();
    			_currentScissorTest = _scissorTest;

    		}

    		const framebufferBound = state.bindFramebuffer( 36160, framebuffer );

    		if ( framebufferBound && capabilities.drawBuffers && useDefaultFramebuffer ) {

    			let needsUpdate = false;

    			if ( renderTarget ) {

    				if ( renderTarget.isWebGLMultipleRenderTargets ) {

    					const textures = renderTarget.texture;

    					if ( _currentDrawBuffers.length !== textures.length || _currentDrawBuffers[ 0 ] !== 36064 ) {

    						for ( let i = 0, il = textures.length; i < il; i ++ ) {

    							_currentDrawBuffers[ i ] = 36064 + i;

    						}

    						_currentDrawBuffers.length = textures.length;

    						needsUpdate = true;

    					}

    				} else {

    					if ( _currentDrawBuffers.length !== 1 || _currentDrawBuffers[ 0 ] !== 36064 ) {

    						_currentDrawBuffers[ 0 ] = 36064;
    						_currentDrawBuffers.length = 1;

    						needsUpdate = true;

    					}

    				}

    			} else {

    				if ( _currentDrawBuffers.length !== 1 || _currentDrawBuffers[ 0 ] !== 1029 ) {

    					_currentDrawBuffers[ 0 ] = 1029;
    					_currentDrawBuffers.length = 1;

    					needsUpdate = true;

    				}

    			}

    			if ( needsUpdate ) {

    				if ( capabilities.isWebGL2 ) {

    					_gl.drawBuffers( _currentDrawBuffers );

    				} else {

    					extensions.get( 'WEBGL_draw_buffers' ).drawBuffersWEBGL( _currentDrawBuffers );

    				}

    			}

    		}

    		state.viewport( _currentViewport );
    		state.scissor( _currentScissor );
    		state.setScissorTest( _currentScissorTest );

    		if ( isCube ) {

    			const textureProperties = properties.get( renderTarget.texture );
    			_gl.framebufferTexture2D( 36160, 36064, 34069 + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel );

    		} else if ( isRenderTarget3D ) {

    			const textureProperties = properties.get( renderTarget.texture );
    			const layer = activeCubeFace || 0;
    			_gl.framebufferTextureLayer( 36160, 36064, textureProperties.__webglTexture, activeMipmapLevel || 0, layer );

    		}

    		_currentMaterialId = - 1; // reset current material to ensure correct uniform bindings

    	};
    	this.readRenderTargetPixels = function ( renderTarget, x, y, width, height, buffer, activeCubeFaceIndex ) {

    		if ( ! ( renderTarget && renderTarget.isWebGLRenderTarget ) ) {

    			console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.' );
    			return;

    		}

    		let framebuffer = properties.get( renderTarget ).__webglFramebuffer;

    		if ( renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== undefined ) {

    			framebuffer = framebuffer[ activeCubeFaceIndex ];

    		}

    		if ( framebuffer ) {

    			state.bindFramebuffer( 36160, framebuffer );

    			try {

    				const texture = renderTarget.texture;
    				const textureFormat = texture.format;
    				const textureType = texture.type;

    				if ( textureFormat !== RGBAFormat && utils.convert( textureFormat ) !== _gl.getParameter( 35739 ) ) {

    					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.' );
    					return;

    				}

    				const halfFloatSupportedByExt = ( textureType === HalfFloatType ) && ( extensions.has( 'EXT_color_buffer_half_float' ) || ( capabilities.isWebGL2 && extensions.has( 'EXT_color_buffer_float' ) ) );

    				if ( textureType !== UnsignedByteType && utils.convert( textureType ) !== _gl.getParameter( 35738 ) && // Edge and Chrome Mac < 52 (#9513)
    					! ( textureType === FloatType && ( capabilities.isWebGL2 || extensions.has( 'OES_texture_float' ) || extensions.has( 'WEBGL_color_buffer_float' ) ) ) && // Chrome Mac >= 52 and Firefox
    					! halfFloatSupportedByExt ) {

    					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.' );
    					return;

    				}

    				if ( _gl.checkFramebufferStatus( 36160 ) === 36053 ) {

    					// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

    					if ( ( x >= 0 && x <= ( renderTarget.width - width ) ) && ( y >= 0 && y <= ( renderTarget.height - height ) ) ) {

    						_gl.readPixels( x, y, width, height, utils.convert( textureFormat ), utils.convert( textureType ), buffer );

    					}

    				} else {

    					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.' );

    				}

    			} finally {

    				// restore framebuffer of current render target if necessary

    				const framebuffer = ( _currentRenderTarget !== null ) ? properties.get( _currentRenderTarget ).__webglFramebuffer : null;
    				state.bindFramebuffer( 36160, framebuffer );

    			}

    		}

    	};