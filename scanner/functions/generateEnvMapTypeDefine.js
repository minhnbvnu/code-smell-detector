function generateEnvMapTypeDefine( parameters ) {

    	let envMapTypeDefine = 'ENVMAP_TYPE_CUBE';

    	if ( parameters.envMap ) {

    		switch ( parameters.envMapMode ) {

    			case CubeReflectionMapping:
    			case CubeRefractionMapping:
    				envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
    				break;

    			case CubeUVReflectionMapping:
    			case CubeUVRefractionMapping:
    				envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
    				break;

    		}

    	}

    	return envMapTypeDefine;

    }