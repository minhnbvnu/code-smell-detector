function UniformsCache() {

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
    						direction: new Vector3(),
    						color: new Color()
    					};
    					break;

    				case 'SpotLight':
    					uniforms = {
    						position: new Vector3(),
    						direction: new Vector3(),
    						color: new Color(),
    						distance: 0,
    						coneCos: 0,
    						penumbraCos: 0,
    						decay: 0
    					};
    					break;

    				case 'PointLight':
    					uniforms = {
    						position: new Vector3(),
    						color: new Color(),
    						distance: 0,
    						decay: 0
    					};
    					break;

    				case 'HemisphereLight':
    					uniforms = {
    						direction: new Vector3(),
    						skyColor: new Color(),
    						groundColor: new Color()
    					};
    					break;

    				case 'RectAreaLight':
    					uniforms = {
    						color: new Color(),
    						position: new Vector3(),
    						halfWidth: new Vector3(),
    						halfHeight: new Vector3()
    					};
    					break;

    			}

    			lights[ light.id ] = uniforms;

    			return uniforms;

    		}

    	};

    }