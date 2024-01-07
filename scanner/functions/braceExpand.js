function braceExpand(pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options;
	    } else {
	      options = {};
	    }
	  }

	  pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

	  if (typeof pattern === 'undefined') {
	    throw new TypeError('undefined pattern');
	  }

	  if (options.nobrace || !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern];
	  }

	  return expand(pattern);
	}