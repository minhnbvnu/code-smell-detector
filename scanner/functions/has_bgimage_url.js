function has_bgimage_url(tokenized) {
				for (var i = 0; i < tokenized.length; i++) {
					if (tokenized[i].length < 1)
						continue;
					if (typeof tokenized[i][0] !== "object")
						continue;
					var our_func = tokenized[i][0];
					var funcname = our_func.name;
					// TODO: support image() and cross-fade()
					var allowed = [
						"url",
						"-webkit-image-set",
						"image-set"
					];
					if (array_indexof(allowed, funcname) < 0)
						continue;
					if (funcname === "url") {
						if (our_func.tokens.length >= 1 && our_func.tokens[0].length > 0 && our_func.tokens[0][0].length > 0)
							return true;
					} else {
						if (has_bgimage_url(our_func.tokens))
							return true;
					}
				}
				return false;
			}