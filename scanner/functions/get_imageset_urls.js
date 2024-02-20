function get_imageset_urls(func) {
				var urls = [];
				for (var i = 0; i < func.tokens.length; i++) {
					if (func.tokens[i].length < 1) {
						continue;
					}
					var url = get_urlfunc_url(func.tokens[i][0]);
					if (!url)
						continue;
					var source = {
						src: url
					};
					for (var j = 1; j < func.tokens[i].length; j++) {
						var desc = func.tokens[i][j];
						var whxmatch = desc.match(/^([0-9.]+)(x|dp(?:px|i|cm))$/);
						if (whxmatch) {
							var number = parseFloat(whxmatch[1]);
							if (number > 0) {
								var unit = whxmatch[2];
								// https://drafts.csswg.org/css-values-3/#cm
								if (unit === "dppx") {
									number *= 96;
									unit = "dpi";
								} else if (unit === "dpcm") {
									number *= 96 / 2.54;
									unit = "dpi";
								}
								if (unit === "x")
									source.desc_x = number;
								else if (unit === "dpi")
									source.dpi = number;
							}
						} else {
							console_warn("Unknown descriptor: " + desc);
						}
					}
					urls.push(source);
				}
				return urls;
			}