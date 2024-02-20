function TAP12Producer() {
	    /**
	     * Writes that test failed to reporter output stream, with error formatting.
	     * @override
	     */
	    this.writeFail = function (n, test, err) {
	      TAPProducer.prototype.writeFail.call(this, n, test, err);

	      if (err.message) {
	        println(err.message.replace(/^/gm, '  '));
	      }

	      if (err.stack) {
	        println(err.stack.replace(/^/gm, '  '));
	      }
	    };
	  }