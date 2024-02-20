function resetGlobalState() {

    		if ( uniform.value !== globalState ) {

    			uniform.value = globalState;
    			uniform.needsUpdate = numGlobalPlanes > 0;

    		}

    		scope.numPlanes = numGlobalPlanes;
    		scope.numIntersection = 0;

    	}