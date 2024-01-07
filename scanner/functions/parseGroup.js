function parseGroup(matchA, typeA, matchB, typeB) {
	      var type = null,
	          from = pos;

	      if (match(matchA)) {
	        type = typeA;
	      } else if (match(matchB)) {
	        type = typeB;
	      } else {
	        return false;
	      }

	      var body = parseDisjunction();
	      if (!body) {
	        bail('Expected disjunction');
	      }
	      skip(')');
	      var group = createGroup(type, flattenBody(body), from, pos);

	      if (type == 'normal') {
	        // Keep track of the number of closed groups. This is required for
	        // parseDecimalEscape(). In case the string is parsed a second time the
	        // value already holds the total count and no incrementation is required.
	        if (firstIteration) {
	          closedCaptureCounter++;
	        }
	      }
	      return group;
	    }