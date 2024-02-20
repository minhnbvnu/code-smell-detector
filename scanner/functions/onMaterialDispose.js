function onMaterialDispose( event ) {

    		const material = event.target;

    		material.removeEventListener( 'dispose', onMaterialDispose );

    		deallocateMaterial( material );

    	}