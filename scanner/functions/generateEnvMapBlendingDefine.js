function generateEnvMapBlendingDefine( parameters ) {

    	let envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';

    	if ( parameters.envMap ) {

    		switch ( parameters.combine ) {

    			case MultiplyOperation:
    				envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
    				break;

    			case MixOperation:
    				envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
    				break;

    			case AddOperation:
    				envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
    				break;

    		}

    	}

    	return envMapBlendingDefine;

    }