function DSHttpAdapter(options) {
	    _classCallCheck(this, DSHttpAdapter);
	
	    options || (options = {});
	    this.defaults = new Defaults();
	    if (console) {
	      this.defaults.log = function (a, b) {
	        return console[typeof console.info === 'function' ? 'info' : 'log'](a, b);
	      };
	    }
	    if (console) {
	      this.defaults.error = function (a, b) {
	        return console[typeof console.error === 'function' ? 'error' : 'log'](a, b);
	      };
	    }
	    deepMixIn(this.defaults, options);
	    this.http = options.http || axios;
	  }