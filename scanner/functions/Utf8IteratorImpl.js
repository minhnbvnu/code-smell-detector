function Utf8IteratorImpl(upstream) {
	    var _this2;

	    _this2 = _OneToManyIterator.call(this) || this;
	    _this2.upstream = upstream;

	    if (env().get('IS_BROWSER')) {
	      _this2.decoder = new TextDecoder('utf-8');
	    } else {
	      // tslint:disable-next-line:no-require-imports
	      var _require = require('string_decoder'),
	          StringDecoder = _require.StringDecoder;

	      _this2.decoder = new StringDecoder('utf8');
	    }

	    return _this2;
	  }