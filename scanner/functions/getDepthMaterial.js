function getDepthMaterial( object, geometry, material, light, shadowCameraNear, shadowCameraFar, type ) {

    		let result = null;

    		const customMaterial = ( light.isPointLight === true ) ? object.customDistanceMaterial : object.customDepthMaterial;

    		if ( customMaterial !== undefined ) {

    			result = customMaterial;

    		} else {

    			result = ( light.isPointLight === true ) ? _distanceMaterial : _depthMaterial;

    		}

    		if ( ( _renderer.localClippingEnabled && material.clipShadows === true && material.clippingPlanes.length !== 0 ) ||
    			( material.displacementMap && material.displacementScale !== 0 ) ||
    			( material.alphaMap && material.alphaTest > 0 ) ) {

    			// in this case we need a unique material instance reflecting the
    			// appropriate state

    			const keyA = result.uuid, keyB = material.uuid;

    			let materialsForVariant = _materialCache[ keyA ];

    			if ( materialsForVariant === undefined ) {

    				materialsForVariant = {};
    				_materialCache[ keyA ] = materialsForVariant;

    			}

    			let cachedMaterial = materialsForVariant[ keyB ];

    			if ( cachedMaterial === undefined ) {

    				cachedMaterial = result.clone();
    				materialsForVariant[ keyB ] = cachedMaterial;

    			}

    			result = cachedMaterial;

    		}

    		result.visible = material.visible;
    		result.wireframe = material.wireframe;

    		if ( type === VSMShadowMap ) {

    			result.side = ( material.shadowSide !== null ) ? material.shadowSide : material.side;

    		} else {

    			result.side = ( material.shadowSide !== null ) ? material.shadowSide : shadowSide[ material.side ];

    		}

    		result.alphaMap = material.alphaMap;
    		result.alphaTest = material.alphaTest;

    		result.clipShadows = material.clipShadows;
    		result.clippingPlanes = material.clippingPlanes;
    		result.clipIntersection = material.clipIntersection;

    		result.displacementMap = material.displacementMap;
    		result.displacementScale = material.displacementScale;
    		result.displacementBias = material.displacementBias;

    		result.wireframeLinewidth = material.wireframeLinewidth;
    		result.linewidth = material.linewidth;

    		if ( light.isPointLight === true && result.isMeshDistanceMaterial === true ) {

    			result.referencePosition.setFromMatrixPosition( light.matrixWorld );
    			result.nearDistance = shadowCameraNear;
    			result.farDistance = shadowCameraFar;

    		}

    		return result;

    	}