function isIdentifierNameES5(id) {
	        var i, iz, ch;

	        if (id.length === 0) {
	            return false;
	        }

	        ch = id.charCodeAt(0);
	        if (!code.isIdentifierStartES5(ch)) {
	            return false;
	        }

	        for (i = 1, iz = id.length; i < iz; ++i) {
	            ch = id.charCodeAt(i);
	            if (!code.isIdentifierPartES5(ch)) {
	                return false;
	            }
	        }
	        return true;
	    }