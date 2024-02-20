function cleanArrReferences(arr) {
	      for (var i = 0; i < arr.length; i++) {
	        delete arr[i].fn;
	      }
	    }