function bail(message, details, from, to) {
	      from = from == null ? pos : from;
	      to = to == null ? from : to;

	      var contextStart = Math.max(0, from - 10);
	      var contextEnd = Math.min(to + 10, str.length);

	      // Output a bit of context and a line pointing to where our error is.
	      //
	      // We are assuming that there are no actual newlines in the content as this is a regular expression.
	      var context = '    ' + str.substring(contextStart, contextEnd);
	      var pointer = '    ' + new Array(from - contextStart + 1).join(' ') + '^';

	      throw SyntaxError(message + ' at position ' + from + (details ? ': ' + details : '') + '\n' + context + '\n' + pointer);
	    }