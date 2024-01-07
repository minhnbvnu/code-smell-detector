function hasRestProperty(path) {
	    var foundRestProperty = false;
	    path.traverse({
	      RestProperty: function RestProperty() {
	        foundRestProperty = true;
	        path.stop();
	      }
	    });
	    return foundRestProperty;
	  }