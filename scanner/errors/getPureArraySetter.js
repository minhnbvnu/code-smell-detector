function getPureArraySetter( type ) {

    	switch ( type ) {

    		case 0x1406: return setValueV1fArray; // FLOAT
    		case 0x8b50: return setValueV2fArray; // _VEC2
    		case 0x8b51: return setValueV3fArray; // _VEC3
    		case 0x8b52: return setValueV4fArray; // _VEC4

    		case 0x8b5a: return setValueM2Array; // _MAT2
    		case 0x8b5b: return setValueM3Array; // _MAT3
    		case 0x8b5c: return setValueM4Array; // _MAT4

    		case 0x1404: case 0x8b56: return setValueV1iArray; // INT, BOOL
    		case 0x8b53: case 0x8b57: return setValueV2iArray; // _VEC2
    		case 0x8b54: case 0x8b58: return setValueV3iArray; // _VEC3
    		case 0x8b55: case 0x8b59: return setValueV4iArray; // _VEC4

    		case 0x1405: return setValueV1uiArray; // UINT
    		case 0x8dc6: return setValueV2uiArray; // _VEC2
    		case 0x8dc7: return setValueV3uiArray; // _VEC3
    		case 0x8dc8: return setValueV4uiArray; // _VEC4

    		case 0x8b5e: // SAMPLER_2D
    		case 0x8d66: // SAMPLER_EXTERNAL_OES
    		case 0x8dca: // INT_SAMPLER_2D
    		case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
    		case 0x8b62: // SAMPLER_2D_SHADOW
    			return setValueT1Array;

    		case 0x8b5f: // SAMPLER_3D
    		case 0x8dcb: // INT_SAMPLER_3D
    		case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
    			return setValueT3DArray;

    		case 0x8b60: // SAMPLER_CUBE
    		case 0x8dcc: // INT_SAMPLER_CUBE
    		case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
    		case 0x8dc5: // SAMPLER_CUBE_SHADOW
    			return setValueT6Array;

    		case 0x8dc1: // SAMPLER_2D_ARRAY
    		case 0x8dcf: // INT_SAMPLER_2D_ARRAY
    		case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
    		case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
    			return setValueT2DArrayArray;

    	}

    }