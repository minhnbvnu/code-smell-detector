function DepthBuffer() {

    		let locked = false;

    		let currentDepthMask = null;
    		let currentDepthFunc = null;
    		let currentDepthClear = null;

    		return {

    			setTest: function ( depthTest ) {

    				if ( depthTest ) {

    					enable( 2929 );

    				} else {

    					disable( 2929 );

    				}

    			},

    			setMask: function ( depthMask ) {

    				if ( currentDepthMask !== depthMask && ! locked ) {

    					gl.depthMask( depthMask );
    					currentDepthMask = depthMask;

    				}

    			},

    			setFunc: function ( depthFunc ) {

    				if ( currentDepthFunc !== depthFunc ) {

    					if ( depthFunc ) {

    						switch ( depthFunc ) {

    							case NeverDepth:

    								gl.depthFunc( 512 );
    								break;

    							case AlwaysDepth:

    								gl.depthFunc( 519 );
    								break;

    							case LessDepth:

    								gl.depthFunc( 513 );
    								break;

    							case LessEqualDepth:

    								gl.depthFunc( 515 );
    								break;

    							case EqualDepth:

    								gl.depthFunc( 514 );
    								break;

    							case GreaterEqualDepth:

    								gl.depthFunc( 518 );
    								break;

    							case GreaterDepth:

    								gl.depthFunc( 516 );
    								break;

    							case NotEqualDepth:

    								gl.depthFunc( 517 );
    								break;

    							default:

    								gl.depthFunc( 515 );

    						}

    					} else {

    						gl.depthFunc( 515 );

    					}

    					currentDepthFunc = depthFunc;

    				}

    			},

    			setLocked: function ( lock ) {

    				locked = lock;

    			},

    			setClear: function ( depth ) {

    				if ( currentDepthClear !== depth ) {

    					gl.clearDepth( depth );
    					currentDepthClear = depth;

    				}

    			},

    			reset: function () {

    				locked = false;

    				currentDepthMask = null;
    				currentDepthFunc = null;
    				currentDepthClear = null;

    			}

    		};

    	}