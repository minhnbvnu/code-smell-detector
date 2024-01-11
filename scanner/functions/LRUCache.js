function LRUCache(options) {
	    _classCallCheck(this, LRUCache);
	    if (typeof options === 'number') options = {
	      max: options
	    };
	    if (!options) options = {};
	    if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number');
	    this[MAX] = options.max || Infinity;
	    var lc = options.length || naiveLength;
	    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
	    this[ALLOW_STALE] = options.stale || false;
	    if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
	    this[MAX_AGE] = options.maxAge || 0;
	    this[DISPOSE] = options.dispose;
	    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
	    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
	    this.reset();
	  }