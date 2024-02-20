function renderTransmissionPass( opaqueObjects, scene, camera ) {

    		if ( _transmissionRenderTarget === null ) {

    			const needsAntialias = _antialias === true && capabilities.isWebGL2 === true;
    			const renderTargetType = needsAntialias ? WebGLMultisampleRenderTarget : WebGLRenderTarget;

    			_transmissionRenderTarget = new renderTargetType( 1024, 1024, {
    				generateMipmaps: true,
    				type: utils.convert( HalfFloatType ) !== null ? HalfFloatType : UnsignedByteType,
    				minFilter: LinearMipmapLinearFilter,
    				magFilter: NearestFilter,
    				wrapS: ClampToEdgeWrapping,
    				wrapT: ClampToEdgeWrapping,
    				useRenderToTexture: extensions.has( 'WEBGL_multisampled_render_to_texture' )
    			} );

    		}

    		const currentRenderTarget = _this.getRenderTarget();
    		_this.setRenderTarget( _transmissionRenderTarget );
    		_this.clear();

    		// Turn off the features which can affect the frag color for opaque objects pass.
    		// Otherwise they are applied twice in opaque objects pass and transmission objects pass.
    		const currentToneMapping = _this.toneMapping;
    		_this.toneMapping = NoToneMapping;

    		renderObjects( opaqueObjects, scene, camera );

    		_this.toneMapping = currentToneMapping;

    		textures.updateMultisampleRenderTarget( _transmissionRenderTarget );
    		textures.updateRenderTargetMipmap( _transmissionRenderTarget );

    		_this.setRenderTarget( currentRenderTarget );

    	}