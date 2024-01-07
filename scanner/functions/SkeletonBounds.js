function SkeletonBounds() {
	      this.minX = 0;
	      this.minY = 0;
	      this.maxX = 0;
	      this.maxY = 0;
	      this.boundingBoxes = new Array();
	      this.polygons = new Array();
	      this.polygonPool = new spine.Pool(function () {
	        return spine.Utils.newFloatArray(16);
	      });
	    }