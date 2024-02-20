function preprocessRFC2822(s) {
	        // Remove comments and folding whitespace and replace multiple-spaces with a single space
	        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
	    }