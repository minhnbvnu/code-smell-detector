function onRenderTargetDispose( event ) {

    		const renderTarget = event.target;

    		renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

    		deallocateRenderTarget( renderTarget );

    	}