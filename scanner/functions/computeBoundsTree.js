function computeBoundsTree( options ) {

    	this.boundsTree = new MeshBVH( this, options );
    	return this.boundsTree;

    }