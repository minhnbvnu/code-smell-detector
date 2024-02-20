function get_urlfunc_url(func) {
				if (typeof func !== "object")
					return null;
				if (func.name !== "url")
					return null;
				if (func.tokens.length < 1 || func.tokens[0].length < 1 || func.tokens[0][0].length === 0)
					return null;
				return func.tokens[0][0];
			}