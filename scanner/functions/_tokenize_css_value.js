function _tokenize_css_value(str) {
				var tokensets = [];
				var tokens = [];
				var current_token = "";
				var quote = null;
				var escaping = false;
				for (var i = 0; i < str.length; i++) {
					var char = str[i];
					if (escaping) {
						current_token += char;
						escaping = false;
						continue;
					}
					if (quote) {
						if (char === quote) {
							quote = null;
							tokens.push(current_token);
							current_token = "";
						} else {
							current_token += char;
						}
						continue;
					}
					if (/\s/.test(char)) {
						if (current_token.length > 0) {
							tokens.push(current_token);
							current_token = "";
						}
						continue;
					} else if (char === '\\') {
						escaping = true;
						continue;
					} else if (char === '"' || char === "'") {
						quote = char;
						continue;
					} else if (char === '(') {
						var subtokens = _tokenize_css_value(str.substr(i + 1));
						tokens.push({ name: current_token, tokens: subtokens[0] });
						i += subtokens[1];
						current_token = "";
						continue;
					} else if (char === ')') {
						i++;
						break;
					} else if (char === ',') {
						if (current_token)
							tokens.push(current_token);
						tokensets.push(tokens);
						tokens = [];
						current_token = "";
						continue;
					}
					current_token += char;
				}
				if (current_token)
					tokens.push(current_token);
				if (tokens)
					tokensets.push(tokens);
				return [tokensets, i];
			}