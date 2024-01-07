function parseQuantifier() {
	      // Quantifier ::
	      //      QuantifierPrefix
	      //      QuantifierPrefix ?
	      //
	      // QuantifierPrefix ::
	      //      *
	      //      +
	      //      ?
	      //      { DecimalDigits }
	      //      { DecimalDigits , }
	      //      { DecimalDigits , DecimalDigits }

	      var res,
	          from = pos;
	      var quantifier;
	      var min, max;

	      if (match('*')) {
	        quantifier = createQuantifier(0);
	      } else if (match('+')) {
	        quantifier = createQuantifier(1);
	      } else if (match('?')) {
	        quantifier = createQuantifier(0, 1);
	      } else if (res = matchReg(/^\{([0-9]+)\}/)) {
	        min = parseInt(res[1], 10);
	        quantifier = createQuantifier(min, min, res.range[0], res.range[1]);
	      } else if (res = matchReg(/^\{([0-9]+),\}/)) {
	        min = parseInt(res[1], 10);
	        quantifier = createQuantifier(min, undefined, res.range[0], res.range[1]);
	      } else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
	        min = parseInt(res[1], 10);
	        max = parseInt(res[2], 10);
	        if (min > max) {
	          bail('numbers out of order in {} quantifier', '', from, pos);
	        }
	        quantifier = createQuantifier(min, max, res.range[0], res.range[1]);
	      }

	      if (quantifier) {
	        if (match('?')) {
	          quantifier.greedy = false;
	          quantifier.range[1] += 1;
	        }
	      }

	      return quantifier;
	    }