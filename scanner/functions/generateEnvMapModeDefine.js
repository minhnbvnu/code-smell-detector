function generateEnvMapModeDefine( parameters ) {

    	let envMapModeDefine = 'ENVMAP_MODE_REFLECTION';

    	if ( parameters.envMap ) {

    		switch ( parameters.envMapMode ) {

    			case CubeRefractionMapping:
    			case CubeUVRefractionMapping:

    				envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
    				break;

    		}

    	}

    	return envMapModeDefine;

    }