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