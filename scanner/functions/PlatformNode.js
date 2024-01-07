function PlatformNode() {
	    // tslint:disable-next-line:no-require-imports
	    this.util = require('util'); // According to the spec, the built-in encoder can do only UTF-8 encoding.
	    // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder

	    this.textEncoder = new this.util.TextEncoder();
	  }