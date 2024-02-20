function getRenderTargetSamples( renderTarget ) {

    		return ( isWebGL2 && ( renderTarget.useRenderbuffer || renderTarget.useRenderToTexture ) ) ?
    			Math.min( maxSamples, renderTarget.samples ) : 0;

    	}