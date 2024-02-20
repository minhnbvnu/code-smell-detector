function WebGLState( gl, extensions, capabilities ) {

    	const isWebGL2 = capabilities.isWebGL2;

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

    	//

    	const colorBuffer = new ColorBuffer();
    	const depthBuffer = new DepthBuffer();
    	const stencilBuffer = new StencilBuffer();

    	let enabledCapabilities = {};

    	let currentBoundFramebuffers = {};

    	let currentProgram = null;

    	let currentBlendingEnabled = false;
    	let currentBlending = null;
    	let currentBlendEquation = null;
    	let currentBlendSrc = null;
    	let currentBlendDst = null;
    	let currentBlendEquationAlpha = null;
    	let currentBlendSrcAlpha = null;
    	let currentBlendDstAlpha = null;
    	let currentPremultipledAlpha = false;

    	let currentFlipSided = null;
    	let currentCullFace = null;

    	let currentLineWidth = null;

    	let currentPolygonOffsetFactor = null;
    	let currentPolygonOffsetUnits = null;

    	const maxTextures = gl.getParameter( 35661 );

    	let lineWidthAvailable = false;
    	let version = 0;
    	const glVersion = gl.getParameter( 7938 );

    	if ( glVersion.indexOf( 'WebGL' ) !== - 1 ) {

    		version = parseFloat( /^WebGL (\d)/.exec( glVersion )[ 1 ] );
    		lineWidthAvailable = ( version >= 1.0 );

    	} else if ( glVersion.indexOf( 'OpenGL ES' ) !== - 1 ) {

    		version = parseFloat( /^OpenGL ES (\d)/.exec( glVersion )[ 1 ] );
    		lineWidthAvailable = ( version >= 2.0 );

    	}

    	let currentTextureSlot = null;
    	let currentBoundTextures = {};

    	const scissorParam = gl.getParameter( 3088 );
    	const viewportParam = gl.getParameter( 2978 );

    	const currentScissor = new Vector4().fromArray( scissorParam );
    	const currentViewport = new Vector4().fromArray( viewportParam );

    	function createTexture( type, target, count ) {

    		const data = new Uint8Array( 4 ); // 4 is required to match default unpack alignment of 4.
    		const texture = gl.createTexture();

    		gl.bindTexture( type, texture );
    		gl.texParameteri( type, 10241, 9728 );
    		gl.texParameteri( type, 10240, 9728 );

    		for ( let i = 0; i < count; i ++ ) {

    			gl.texImage2D( target + i, 0, 6408, 1, 1, 0, 6408, 5121, data );

    		}

    		return texture;

    	}

    	const emptyTextures = {};
    	emptyTextures[ 3553 ] = createTexture( 3553, 3553, 1 );
    	emptyTextures[ 34067 ] = createTexture( 34067, 34069, 6 );

    	// init

    	colorBuffer.setClear( 0, 0, 0, 1 );
    	depthBuffer.setClear( 1 );
    	stencilBuffer.setClear( 0 );

    	enable( 2929 );
    	depthBuffer.setFunc( LessEqualDepth );

    	setFlipSided( false );
    	setCullFace( CullFaceBack );
    	enable( 2884 );

    	setBlending( NoBlending );

    	//

    	function enable( id ) {

    		if ( enabledCapabilities[ id ] !== true ) {

    			gl.enable( id );
    			enabledCapabilities[ id ] = true;

    		}

    	}

    	function disable( id ) {

    		if ( enabledCapabilities[ id ] !== false ) {

    			gl.disable( id );
    			enabledCapabilities[ id ] = false;

    		}

    	}

    	function bindFramebuffer( target, framebuffer ) {

    		if ( currentBoundFramebuffers[ target ] !== framebuffer ) {

    			gl.bindFramebuffer( target, framebuffer );

    			currentBoundFramebuffers[ target ] = framebuffer;

    			if ( isWebGL2 ) {

    				// 36009 is equivalent to 36160

    				if ( target === 36009 ) {

    					currentBoundFramebuffers[ 36160 ] = framebuffer;

    				}

    				if ( target === 36160 ) {

    					currentBoundFramebuffers[ 36009 ] = framebuffer;

    				}

    			}

    			return true;

    		}

    		return false;

    	}

    	function useProgram( program ) {

    		if ( currentProgram !== program ) {

    			gl.useProgram( program );

    			currentProgram = program;

    			return true;

    		}

    		return false;

    	}

    	const equationToGL = {
    		[ AddEquation ]: 32774,
    		[ SubtractEquation ]: 32778,
    		[ ReverseSubtractEquation ]: 32779
    	};

    	if ( isWebGL2 ) {

    		equationToGL[ MinEquation ] = 32775;
    		equationToGL[ MaxEquation ] = 32776;

    	} else {

    		const extension = extensions.get( 'EXT_blend_minmax' );

    		if ( extension !== null ) {

    			equationToGL[ MinEquation ] = extension.MIN_EXT;
    			equationToGL[ MaxEquation ] = extension.MAX_EXT;

    		}

    	}

    	const factorToGL = {
    		[ ZeroFactor ]: 0,
    		[ OneFactor ]: 1,
    		[ SrcColorFactor ]: 768,
    		[ SrcAlphaFactor ]: 770,
    		[ SrcAlphaSaturateFactor ]: 776,
    		[ DstColorFactor ]: 774,
    		[ DstAlphaFactor ]: 772,
    		[ OneMinusSrcColorFactor ]: 769,
    		[ OneMinusSrcAlphaFactor ]: 771,
    		[ OneMinusDstColorFactor ]: 775,
    		[ OneMinusDstAlphaFactor ]: 773
    	};

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

    	function setMaterial( material, frontFaceCW ) {

    		material.side === DoubleSide
    			? disable( 2884 )
    			: enable( 2884 );

    		let flipSided = ( material.side === BackSide );
    		if ( frontFaceCW ) flipSided = ! flipSided;

    		setFlipSided( flipSided );

    		( material.blending === NormalBlending && material.transparent === false )
    			? setBlending( NoBlending )
    			: setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha );

    		depthBuffer.setFunc( material.depthFunc );
    		depthBuffer.setTest( material.depthTest );
    		depthBuffer.setMask( material.depthWrite );
    		colorBuffer.setMask( material.colorWrite );

    		const stencilWrite = material.stencilWrite;
    		stencilBuffer.setTest( stencilWrite );
    		if ( stencilWrite ) {

    			stencilBuffer.setMask( material.stencilWriteMask );
    			stencilBuffer.setFunc( material.stencilFunc, material.stencilRef, material.stencilFuncMask );
    			stencilBuffer.setOp( material.stencilFail, material.stencilZFail, material.stencilZPass );

    		}

    		setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

    		material.alphaToCoverage === true
    			? enable( 32926 )
    			: disable( 32926 );

    	}

    	//

    	function setFlipSided( flipSided ) {

    		if ( currentFlipSided !== flipSided ) {

    			if ( flipSided ) {

    				gl.frontFace( 2304 );

    			} else {

    				gl.frontFace( 2305 );

    			}

    			currentFlipSided = flipSided;

    		}

    	}

    	function setCullFace( cullFace ) {

    		if ( cullFace !== CullFaceNone ) {

    			enable( 2884 );

    			if ( cullFace !== currentCullFace ) {

    				if ( cullFace === CullFaceBack ) {

    					gl.cullFace( 1029 );

    				} else if ( cullFace === CullFaceFront ) {

    					gl.cullFace( 1028 );

    				} else {

    					gl.cullFace( 1032 );

    				}

    			}

    		} else {

    			disable( 2884 );

    		}

    		currentCullFace = cullFace;

    	}

    	function setLineWidth( width ) {

    		if ( width !== currentLineWidth ) {

    			if ( lineWidthAvailable ) gl.lineWidth( width );

    			currentLineWidth = width;

    		}

    	}

    	function setPolygonOffset( polygonOffset, factor, units ) {

    		if ( polygonOffset ) {

    			enable( 32823 );

    			if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

    				gl.polygonOffset( factor, units );

    				currentPolygonOffsetFactor = factor;
    				currentPolygonOffsetUnits = units;

    			}

    		} else {

    			disable( 32823 );

    		}

    	}

    	function setScissorTest( scissorTest ) {

    		if ( scissorTest ) {

    			enable( 3089 );

    		} else {

    			disable( 3089 );

    		}

    	}

    	// texture

    	function activeTexture( webglSlot ) {

    		if ( webglSlot === undefined ) webglSlot = 33984 + maxTextures - 1;

    		if ( currentTextureSlot !== webglSlot ) {

    			gl.activeTexture( webglSlot );
    			currentTextureSlot = webglSlot;

    		}

    	}

    	function bindTexture( webglType, webglTexture ) {

    		if ( currentTextureSlot === null ) {

    			activeTexture();

    		}

    		let boundTexture = currentBoundTextures[ currentTextureSlot ];

    		if ( boundTexture === undefined ) {

    			boundTexture = { type: undefined, texture: undefined };
    			currentBoundTextures[ currentTextureSlot ] = boundTexture;

    		}

    		if ( boundTexture.type !== webglType || boundTexture.texture !== webglTexture ) {

    			gl.bindTexture( webglType, webglTexture || emptyTextures[ webglType ] );

    			boundTexture.type = webglType;
    			boundTexture.texture = webglTexture;

    		}

    	}

    	function unbindTexture() {

    		const boundTexture = currentBoundTextures[ currentTextureSlot ];

    		if ( boundTexture !== undefined && boundTexture.type !== undefined ) {

    			gl.bindTexture( boundTexture.type, null );

    			boundTexture.type = undefined;
    			boundTexture.texture = undefined;

    		}

    	}

    	function compressedTexImage2D() {

    		try {

    			gl.compressedTexImage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}

    	function texSubImage2D() {

    		try {

    			gl.texSubImage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}

    	function texStorage2D() {

    		try {

    			gl.texStorage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}

    	function texImage2D() {

    		try {

    			gl.texImage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}

    	function texImage3D() {

    		try {

    			gl.texImage3D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}

    	//

    	function scissor( scissor ) {

    		if ( currentScissor.equals( scissor ) === false ) {

    			gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
    			currentScissor.copy( scissor );

    		}

    	}

    	function viewport( viewport ) {

    		if ( currentViewport.equals( viewport ) === false ) {

    			gl.viewport( viewport.x, viewport.y, viewport.z, viewport.w );
    			currentViewport.copy( viewport );

    		}

    	}

    	//

    	function reset() {

    		// reset state

    		gl.disable( 3042 );
    		gl.disable( 2884 );
    		gl.disable( 2929 );
    		gl.disable( 32823 );
    		gl.disable( 3089 );
    		gl.disable( 2960 );
    		gl.disable( 32926 );

    		gl.blendEquation( 32774 );
    		gl.blendFunc( 1, 0 );
    		gl.blendFuncSeparate( 1, 0, 1, 0 );

    		gl.colorMask( true, true, true, true );
    		gl.clearColor( 0, 0, 0, 0 );

    		gl.depthMask( true );
    		gl.depthFunc( 513 );
    		gl.clearDepth( 1 );

    		gl.stencilMask( 0xffffffff );
    		gl.stencilFunc( 519, 0, 0xffffffff );
    		gl.stencilOp( 7680, 7680, 7680 );
    		gl.clearStencil( 0 );

    		gl.cullFace( 1029 );
    		gl.frontFace( 2305 );

    		gl.polygonOffset( 0, 0 );

    		gl.activeTexture( 33984 );

    		gl.bindFramebuffer( 36160, null );

    		if ( isWebGL2 === true ) {

    			gl.bindFramebuffer( 36009, null );
    			gl.bindFramebuffer( 36008, null );

    		}

    		gl.useProgram( null );

    		gl.lineWidth( 1 );

    		gl.scissor( 0, 0, gl.canvas.width, gl.canvas.height );
    		gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );

    		// reset internals

    		enabledCapabilities = {};

    		currentTextureSlot = null;
    		currentBoundTextures = {};

    		currentBoundFramebuffers = {};

    		currentProgram = null;

    		currentBlendingEnabled = false;
    		currentBlending = null;
    		currentBlendEquation = null;
    		currentBlendSrc = null;
    		currentBlendDst = null;
    		currentBlendEquationAlpha = null;
    		currentBlendSrcAlpha = null;
    		currentBlendDstAlpha = null;
    		currentPremultipledAlpha = false;

    		currentFlipSided = null;
    		currentCullFace = null;

    		currentLineWidth = null;

    		currentPolygonOffsetFactor = null;
    		currentPolygonOffsetUnits = null;

    		currentScissor.set( 0, 0, gl.canvas.width, gl.canvas.height );
    		currentViewport.set( 0, 0, gl.canvas.width, gl.canvas.height );

    		colorBuffer.reset();
    		depthBuffer.reset();
    		stencilBuffer.reset();

    	}

    	return {

    		buffers: {
    			color: colorBuffer,
    			depth: depthBuffer,
    			stencil: stencilBuffer
    		},

    		enable: enable,
    		disable: disable,

    		bindFramebuffer: bindFramebuffer,

    		useProgram: useProgram,

    		setBlending: setBlending,
    		setMaterial: setMaterial,

    		setFlipSided: setFlipSided,
    		setCullFace: setCullFace,

    		setLineWidth: setLineWidth,
    		setPolygonOffset: setPolygonOffset,

    		setScissorTest: setScissorTest,

    		activeTexture: activeTexture,
    		bindTexture: bindTexture,
    		unbindTexture: unbindTexture,
    		compressedTexImage2D: compressedTexImage2D,
    		texImage2D: texImage2D,
    		texImage3D: texImage3D,

    		texStorage2D: texStorage2D,
    		texSubImage2D: texSubImage2D,

    		scissor: scissor,
    		viewport: viewport,

    		reset: reset

    	};

    }