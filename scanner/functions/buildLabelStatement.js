function buildLabelStatement(prefix) {
	  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "label";

	  return function (node) {
	    this.word(prefix);

	    var label = node[key];
	    if (label) {
	      this.space();

	      var terminatorState = this.startTerminatorless();
	      this.print(label, node);
	      this.endTerminatorless(terminatorState);
	    }

	    this.semicolon();
	  };
	}