function ColorBuffer() {

    		let locked = false;

    		const color = new Vector4();
    		let currentColorMask = null;
    		const currentColorClear = new Vector4( 0, 0, 0, 0 );

    		return {

    			setMask: function ( colorMask ) {

    				if ( currentColorMask !== colorMask && ! locked ) {

    					gl.colorMask( colorMask, colorMask, colorMask, colorMask );
    					currentColorMask = colorMask;

    				}

    			},

    			setLocked: function ( lock ) {

    				locked = lock;

    			},

    			setClear: function ( r, g, b, a, premultipliedAlpha ) {

    				if ( premultipliedAlpha === true ) {

    					r *= a; g *= a; b *= a;

    				}

    				color.set( r, g, b, a );

    				if ( currentColorClear.equals( color ) === false ) {

    					gl.clearColor( r, g, b, a );
    					currentColorClear.copy( color );

    				}

    			},

    			reset: function () {

    				locked = false;

    				currentColorMask = null;
    				currentColorClear.set( - 1, 0, 0, 0 ); // set to invalid state

    			}

    		};

    	}