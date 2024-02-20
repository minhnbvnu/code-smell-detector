function materialNeedsLights( material ) {

    		return material.isMeshLambertMaterial || material.isMeshToonMaterial || material.isMeshPhongMaterial ||
    			material.isMeshStandardMaterial || material.isShadowMaterial ||
    			( material.isShaderMaterial && material.lights === true );

    	}