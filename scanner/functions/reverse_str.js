function reverse_str(str) {
		return common_functions["run_arrayd_string"](str, {
			cb: function(arr) {
				return arr.reverse();
			}
		});
	}