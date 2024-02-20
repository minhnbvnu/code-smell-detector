function dimSum(jq, dims) {
			// Opera returns -1 for missing min/max width, turn into 0
			var sum = 0;
			for ( var i=1; i < arguments.length; i++ )
				sum += Math.max(parseInt(jq.css(arguments[i])) || 0, 0);
			return sum;
		}