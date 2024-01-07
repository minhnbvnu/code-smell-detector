function isStrictModeReservedWordES6(id) {
	        switch (id) {
	            case 'implements':
	            case 'interface':
	            case 'package':
	            case 'private':
	            case 'protected':
	            case 'public':
	            case 'static':
	            case 'let':
	                return true;
	            default:
	                return false;
	        }
	    }