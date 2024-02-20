function WebGLRenderState( extensions, capabilities ) {

    	const lights = new WebGLLights( extensions, capabilities );

    	const lightsArray = [];
    	const shadowsArray = [];

    	function init() {

    		lightsArray.length = 0;
    		shadowsArray.length = 0;

    	}

    	function pushLight( light ) {

    		lightsArray.push( light );

    	}

    	function pushShadow( shadowLight ) {

    		shadowsArray.push( shadowLight );

    	}

    	function setupLights( physicallyCorrectLights ) {

    		lights.setup( lightsArray, physicallyCorrectLights );

    	}

    	function setupLightsView( camera ) {

    		lights.setupView( lightsArray, camera );

    	}

    	const state = {
    		lightsArray: lightsArray,
    		shadowsArray: shadowsArray,

    		lights: lights
    	};

    	return {
    		init: init,
    		state: state,
    		setupLights: setupLights,
    		setupLightsView: setupLightsView,

    		pushLight: pushLight,
    		pushShadow: pushShadow
    	};

    }