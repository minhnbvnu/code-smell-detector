function setBlending( blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha ) {

    		if ( blending === NoBlending ) {

    			if ( currentBlendingEnabled === true ) {

    				disable( 3042 );
    				currentBlendingEnabled = false;

    			}

    			return;

    		}

    		if ( currentBlendingEnabled === false ) {

    			enable( 3042 );
    			currentBlendingEnabled = true;

    		}

    		if ( blending !== CustomBlending ) {

    			if ( blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha ) {

    				if ( currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation ) {

    					gl.blendEquation( 32774 );

    					currentBlendEquation = AddEquation;
    					currentBlendEquationAlpha = AddEquation;

    				}

    				if ( premultipliedAlpha ) {

    					switch ( blending ) {

    						case NormalBlending:
    							gl.blendFuncSeparate( 1, 771, 1, 771 );
    							break;

    						case AdditiveBlending:
    							gl.blendFunc( 1, 1 );
    							break;

    						case SubtractiveBlending:
    							gl.blendFuncSeparate( 0, 0, 769, 771 );
    							break;

    						case MultiplyBlending:
    							gl.blendFuncSeparate( 0, 768, 0, 770 );
    							break;

    						default:
    							console.error( 'THREE.WebGLState: Invalid blending: ', blending );
    							break;

    					}

    				} else {

    					switch ( blending ) {

    						case NormalBlending:
    							gl.blendFuncSeparate( 770, 771, 1, 771 );
    							break;

    						case AdditiveBlending:
    							gl.blendFunc( 770, 1 );
    							break;

    						case SubtractiveBlending:
    							gl.blendFunc( 0, 769 );
    							break;

    						case MultiplyBlending:
    							gl.blendFunc( 0, 768 );
    							break;

    						default:
    							console.error( 'THREE.WebGLState: Invalid blending: ', blending );
    							break;

    					}

    				}

    				currentBlendSrc = null;
    				currentBlendDst = null;
    				currentBlendSrcAlpha = null;
    				currentBlendDstAlpha = null;

    				currentBlending = blending;
    				currentPremultipledAlpha = premultipliedAlpha;

    			}

    			return;

    		}

    		// custom blending

    		blendEquationAlpha = blendEquationAlpha || blendEquation;
    		blendSrcAlpha = blendSrcAlpha || blendSrc;
    		blendDstAlpha = blendDstAlpha || blendDst;

    		if ( blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha ) {

    			gl.blendEquationSeparate( equationToGL[ blendEquation ], equationToGL[ blendEquationAlpha ] );

    			currentBlendEquation = blendEquation;
    			currentBlendEquationAlpha = blendEquationAlpha;

    		}

    		if ( blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha ) {

    			gl.blendFuncSeparate( factorToGL[ blendSrc ], factorToGL[ blendDst ], factorToGL[ blendSrcAlpha ], factorToGL[ blendDstAlpha ] );

    			currentBlendSrc = blendSrc;
    			currentBlendDst = blendDst;
    			currentBlendSrcAlpha = blendSrcAlpha;
    			currentBlendDstAlpha = blendDstAlpha;

    		}

    		currentBlending = blending;
    		currentPremultipledAlpha = null;

    	}