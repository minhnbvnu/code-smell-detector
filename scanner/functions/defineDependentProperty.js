function defineDependentProperty(glyph, externalName, internalName) {
	    Object.defineProperty(glyph, externalName, {
	        get: function() {
	            // Request the path property to make sure the path is loaded.
	            glyph.path; // jshint ignore:line
	            return glyph[internalName];
	        },
	        set: function(newValue) {
	            glyph[internalName] = newValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	}