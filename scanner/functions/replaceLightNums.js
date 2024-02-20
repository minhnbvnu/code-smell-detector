function replaceLightNums( string, parameters ) {

    	return string
    		.replace( /NUM_DIR_LIGHTS/g, parameters.numDirLights )
    		.replace( /NUM_SPOT_LIGHTS/g, parameters.numSpotLights )
    		.replace( /NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights )
    		.replace( /NUM_POINT_LIGHTS/g, parameters.numPointLights )
    		.replace( /NUM_HEMI_LIGHTS/g, parameters.numHemiLights )
    		.replace( /NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows )
    		.replace( /NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows )
    		.replace( /NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows );

    }