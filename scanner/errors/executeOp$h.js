	  var value = function (node, tensorMap, context) {
	    switch (node.category) {
	      case 'arithmetic':
	        return tidy(function () {
	          return executeOp(node, tensorMap, context);
	        });

	      case 'basic_math':
	        return tidy(function () {
	          return executeOp$1(node, tensorMap, context);
	        });

	      case 'control':
	        return executeOp$2(node, tensorMap, context);

	      case 'convolution':
	        return tidy(function () {
	          return executeOp$3(node, tensorMap, context);
	        });

	      case 'creation':
	        return tidy(function () {
	          return executeOp$4(node, tensorMap, context);
	        });

	      case 'dynamic':
	        return executeOp$5(node, tensorMap, context);

	      case 'evaluation':
	        return tidy(function () {
	          return executeOp$6(node, tensorMap, context);
	        });

	      case 'image':
	        return tidy(function () {
	          return executeOp$9(node, tensorMap, context);
	        });

	      case 'graph':
	        return tidy(function () {
	          return executeOp$7(node, tensorMap, context);
	        });

	      case 'logical':
	        return tidy(function () {
	          return executeOp$a(node, tensorMap, context);
	        });

	      case 'matrices':
	        return tidy(function () {
	          return executeOp$b(node, tensorMap, context);
	        });

	      case 'normalization':
	        return tidy(function () {
	          return executeOp$c(node, tensorMap, context);
	        });

	      case 'reduction':
	        return tidy(function () {
	          return executeOp$d(node, tensorMap, context);
	        });

	      case 'slice_join':
	        return tidy(function () {
	          return executeOp$e(node, tensorMap, context);
	        });

	      case 'spectral':
	        return tidy(function () {
	          return executeOp$f(node, tensorMap, context);
	        });

	      case 'transformation':
	        return tidy(function () {
	          return executeOp$g(node, tensorMap, context);
	        });

	      case 'hash_table':
	        return executeOp$8(node, tensorMap, context, resourceManager);

	      case 'custom':
	        var opMapper = getRegisteredOp(node.op);

	        if (opMapper && opMapper.customExecutor) {
	          return opMapper.customExecutor(new NodeValueImpl(node, tensorMap, context));
	        } else {
	          throw TypeError("Custom op " + node.op + " is not registered.");
	        }

	      default:
	        throw TypeError("Unknown op '" + node.op + "'. File an issue at " + "https://github.com/tensorflow/tfjs/issues so we can add it" + ", or register a custom execution with tf.registerOp()");
	    }
	  }(node, tensorMap, context);