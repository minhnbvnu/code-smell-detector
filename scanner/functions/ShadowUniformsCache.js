function ShadowUniformsCache() {

    	const lights = {};

    	return {

    		get: function ( light ) {

    			if ( lights[ light.id ] !== undefined ) {

    				return lights[ light.id ];

    			}

    			let uniforms;

    			switch ( light.type ) {

    				case 'DirectionalLight':
    					uniforms = {
    						shadowBias: 0,
    						shadowNormalBias: 0,
    						shadowRadius: 1,
    						shadowMapSize: new Vector2()
    					};
    					break;

    				case 'SpotLight':
    					uniforms = {
    						shadowBias: 0,
    						shadowNormalBias: 0,
    						shadowRadius: 1,
    						shadowMapSize: new Vector2()
    					};
    					break;

    				case 'PointLight':
    					uniforms = {
    						shadowBias: 0,
    						shadowNormalBias: 0,
    						shadowRadius: 1,
    						shadowMapSize: new Vector2(),
    						shadowCameraNear: 1,
    						shadowCameraFar: 1000
    					};
    					break;

    				// TODO (abelnation): set RectAreaLight shadow uniforms

    			}

    			lights[ light.id ] = uniforms;

    			return uniforms;

    		}

    	};

    }