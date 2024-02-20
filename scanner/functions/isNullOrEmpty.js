function isNullOrEmpty(object) {
	        if (typeof object == "undefined")
	            return true;
	        if (object == null)
	            return true;
	        if (jQuery.isArray(object) && object.length == 0)
	            return true;
	        return false;
	    }