function parseDisjunction() {
	      // Disjunction ::
	      //      Alternative
	      //      Alternative | Disjunction
	      var res = [],
	          from = pos;
	      res.push(parseAlternative());

	      while (match('|')) {
	        res.push(parseAlternative());
	      }

	      if (res.length === 1) {
	        return res[0];
	      }

	      return createDisjunction(res, from, pos);
	    }