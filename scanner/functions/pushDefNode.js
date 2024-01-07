function pushDefNode(left, right, i) {
	      var defNode = buildDefaultParam({
	        VARIABLE_NAME: left,
	        DEFAULT_VALUE: right,
	        ARGUMENT_KEY: t.numericLiteral(i),
	        ARGUMENTS: argsIdentifier
	      });
	      defNode._blockHoist = node.params.length - i;
	      body.push(defNode);
	    }