function deallocateMaterial( material ) {

    		releaseMaterialProgramReferences( material );

    		properties.remove( material );

    	}