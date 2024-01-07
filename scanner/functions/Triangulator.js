function Triangulator() {
	      this.convexPolygons = new Array();
	      this.convexPolygonsIndices = new Array();
	      this.indicesArray = new Array();
	      this.isConcaveArray = new Array();
	      this.triangles = new Array();
	      this.polygonPool = new spine.Pool(function () {
	        return new Array();
	      });
	      this.polygonIndicesPool = new spine.Pool(function () {
	        return new Array();
	      });
	    }