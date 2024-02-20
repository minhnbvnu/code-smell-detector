function getToneMappingFunction( functionName, toneMapping ) {

    	let toneMappingName;

    	switch ( toneMapping ) {

    		case LinearToneMapping:
    			toneMappingName = 'Linear';
    			break;

    		case ReinhardToneMapping:
    			toneMappingName = 'Reinhard';
    			break;

    		case CineonToneMapping:
    			toneMappingName = 'OptimizedCineon';
    			break;

    		case ACESFilmicToneMapping:
    			toneMappingName = 'ACESFilmic';
    			break;

    		case CustomToneMapping:
    			toneMappingName = 'Custom';
    			break;

    		default:
    			console.warn( 'THREE.WebGLProgram: Unsupported toneMapping:', toneMapping );
    			toneMappingName = 'Linear';

    	}

    	return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

    }