function generateShadowMapTypeDefine( parameters ) {

    	let shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

    	if ( parameters.shadowMapType === PCFShadowMap ) {

    		shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';

    	} else if ( parameters.shadowMapType === PCFSoftShadowMap ) {

    		shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';

    	} else if ( parameters.shadowMapType === VSMShadowMap ) {

    		shadowMapTypeDefine = 'SHADOWMAP_TYPE_VSM';

    	}

    	return shadowMapTypeDefine;

    }