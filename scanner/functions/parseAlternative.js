function parseAlternative() {
	      var res = [],
	          from = pos;
	      var term;

	      // Alternative ::
	      //      [empty]
	      //      Alternative Term
	      while (term = parseTerm()) {
	        res.push(term);
	      }

	      if (res.length === 1) {
	        return res[0];
	      }

	      return createAlternative(res, from, pos);
	    }