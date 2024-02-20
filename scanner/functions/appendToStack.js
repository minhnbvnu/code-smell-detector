function appendToStack(el) {
	      // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.
	      if (stack[0]) {
	        stack[0].appendChild(el);
	      }
	    }