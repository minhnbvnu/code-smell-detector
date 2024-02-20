function onContextRestore( /* event */ ) {

    		console.log( 'THREE.WebGLRenderer: Context Restored.' );

    		_isContextLost = false;

    		const infoAutoReset = info.autoReset;
    		const shadowMapEnabled = shadowMap.enabled;
    		const shadowMapAutoUpdate = shadowMap.autoUpdate;
    		const shadowMapNeedsUpdate = shadowMap.needsUpdate;
    		const shadowMapType = shadowMap.type;

    		initGLContext();

    		info.autoReset = infoAutoReset;
    		shadowMap.enabled = shadowMapEnabled;
    		shadowMap.autoUpdate = shadowMapAutoUpdate;
    		shadowMap.needsUpdate = shadowMapNeedsUpdate;
    		shadowMap.type = shadowMapType;

    	}