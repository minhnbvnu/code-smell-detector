function renderScene( currentRenderList, scene, camera, viewport ) {

    		const opaqueObjects = currentRenderList.opaque;
    		const transmissiveObjects = currentRenderList.transmissive;
    		const transparentObjects = currentRenderList.transparent;

    		currentRenderState.setupLightsView( camera );

    		if ( transmissiveObjects.length > 0 ) renderTransmissionPass( opaqueObjects, scene, camera );

    		if ( viewport ) state.viewport( _currentViewport.copy( viewport ) );

    		if ( opaqueObjects.length > 0 ) renderObjects( opaqueObjects, scene, camera );
    		if ( transmissiveObjects.length > 0 ) renderObjects( transmissiveObjects, scene, camera );
    		if ( transparentObjects.length > 0 ) renderObjects( transparentObjects, scene, camera );

    	}