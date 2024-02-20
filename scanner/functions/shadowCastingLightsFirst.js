function shadowCastingLightsFirst( lightA, lightB ) {

    	return ( lightB.castShadow ? 1 : 0 ) - ( lightA.castShadow ? 1 : 0 );

    }