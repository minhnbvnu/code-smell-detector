function HTTPRequest(path, loadOptions) {
	    this.DEFAULT_METHOD = 'POST';

	    if (loadOptions == null) {
	      loadOptions = {};
	    }

	    this.weightPathPrefix = loadOptions.weightPathPrefix;
	    this.onProgress = loadOptions.onProgress;
	    this.weightUrlConverter = loadOptions.weightUrlConverter;

	    if (loadOptions.fetchFunc != null) {
	      assert(typeof loadOptions.fetchFunc === 'function', function () {
	        return 'Must pass a function that matches the signature of ' + '`fetch` (see ' + 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)';
	      });
	      this.fetch = loadOptions.fetchFunc;
	    } else {
	      this.fetch = env().platform.fetch;
	    }

	    assert(path != null && path.length > 0, function () {
	      return 'URL path for http must not be null, undefined or ' + 'empty.';
	    });

	    if (Array.isArray(path)) {
	      assert(path.length === 2, function () {
	        return 'URL paths for http must have a length of 2, ' + ("(actual length is " + path.length + ").");
	      });
	    }

	    this.path = path;

	    if (loadOptions.requestInit != null && loadOptions.requestInit.body != null) {
	      throw new Error('requestInit is expected to have no pre-existing body, but has one.');
	    }

	    this.requestInit = loadOptions.requestInit || {};
	  }