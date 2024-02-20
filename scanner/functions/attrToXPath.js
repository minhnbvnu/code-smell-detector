function attrToXPath (wrap) {
					var pre = wrap? "[" : "", post = wrap? "]" : "";
					return function (match, p1, p2, p3, p4) {
						p4 = (p4 || "").replace(regex.quoted, "$1");
						if (p1 === p4 && p1 === "readonly") { p3 = null; }
						return pre + ({
							"^": "starts-with(@" + p1 + ", \"" + p4 + "\")",
							"$": "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p4.length - 1) + "), " + p4.length + ") = \"" + p4 + "\"",
							"*": "contains(concat(\" \", @" + p1 + ", \" \"), \"" + p4 + "\")",
							"|": "@" + p1 + "=\"" + p4 + "\" or starts-with(@" + p1 + ", \"" + p4 + "-\")",
							"~": "contains(concat(\" \", @" + p1 + ", \" \"), \" " + p4 + " \")"
						}[p2] || ("@" + p1 + (p3? "=\"" + p4 + "\"" : ""))) + post;
					};
				}