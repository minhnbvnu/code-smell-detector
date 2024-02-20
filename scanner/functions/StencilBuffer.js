function StencilBuffer() {

    		let locked = false;

    		let currentStencilMask = null;
    		let currentStencilFunc = null;
    		let currentStencilRef = null;
    		let currentStencilFuncMask = null;
    		let currentStencilFail = null;
    		let currentStencilZFail = null;
    		let currentStencilZPass = null;
    		let currentStencilClear = null;

    		return {

    			setTest: function ( stencilTest ) {

    				if ( ! locked ) {

    					if ( stencilTest ) {

    						enable( 2960 );

    					} else {

    						disable( 2960 );

    					}

    				}

    			},

    			setMask: function ( stencilMask ) {

    				if ( currentStencilMask !== stencilMask && ! locked ) {

    					gl.stencilMask( stencilMask );
    					currentStencilMask = stencilMask;

    				}

    			},

    			setFunc: function ( stencilFunc, stencilRef, stencilMask ) {

    				if ( currentStencilFunc !== stencilFunc ||
    				     currentStencilRef !== stencilRef ||
    				     currentStencilFuncMask !== stencilMask ) {

    					gl.stencilFunc( stencilFunc, stencilRef, stencilMask );

    					currentStencilFunc = stencilFunc;
    					currentStencilRef = stencilRef;
    					currentStencilFuncMask = stencilMask;

    				}

    			},

    			setOp: function ( stencilFail, stencilZFail, stencilZPass ) {

    				if ( currentStencilFail !== stencilFail ||
    				     currentStencilZFail !== stencilZFail ||
    				     currentStencilZPass !== stencilZPass ) {

    					gl.stencilOp( stencilFail, stencilZFail, stencilZPass );

    					currentStencilFail = stencilFail;
    					currentStencilZFail = stencilZFail;
    					currentStencilZPass = stencilZPass;

    				}

    			},

    			setLocked: function ( lock ) {

    				locked = lock;

    			},

    			setClear: function ( stencil ) {

    				if ( currentStencilClear !== stencil ) {

    					gl.clearStencil( stencil );
    					currentStencilClear = stencil;

    				}

    			},

    			reset: function () {

    				locked = false;

    				currentStencilMask = null;
    				currentStencilFunc = null;
    				currentStencilRef = null;
    				currentStencilFuncMask = null;
    				currentStencilFail = null;
    				currentStencilZFail = null;
    				currentStencilZPass = null;
    				currentStencilClear = null;

    			}

    		};

    	}