function SkeletonClipping() {
	      this.triangulator = new spine.Triangulator();
	      this.clippingPolygon = new Array();
	      this.clipOutput = new Array();
	      this.clippedVertices = new Array();
	      this.clippedTriangles = new Array();
	      this.scratch = new Array();
	    }