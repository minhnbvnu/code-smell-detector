function TAP13Producer() {
	    /**
	     * Writes the TAP version to reporter output stream.
	     * @override
	     */
	    this.writeVersion = function () {
	      println('TAP version 13');
	    };
	    /**
	     * Writes that test failed to reporter output stream, with error formatting.
	     * @override
	     */


	    this.writeFail = function (n, test, err) {
	      TAPProducer.prototype.writeFail.call(this, n, test, err);
	      var emitYamlBlock = err.message != null || err.stack != null;

	      if (emitYamlBlock) {
	        println(indent(1) + '---');

	        if (err.message) {
	          println(indent(2) + 'message: |-');
	          println(err.message.replace(/^/gm, indent(3)));
	        }

	        if (err.stack) {
	          println(indent(2) + 'stack: |-');
	          println(err.stack.replace(/^/gm, indent(3)));
	        }

	        println(indent(1) + '...');
	      }
	    };

	    function indent(level) {
	      return Array(level + 1).join('  ');
	    }
	  }