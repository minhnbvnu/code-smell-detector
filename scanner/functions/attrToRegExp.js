function attrToRegExp (attrVal, substrOperator) {
				attrVal = attrVal? attrVal.replace(regex.quoted, "$1").replace(/(\.|\[|\])/g, "\\$1") : null;
				return substrOperator? {
					"^": "^" + attrVal,
					"$": attrVal + "$",
					"*": attrVal,
					"|": "^" + attrVal + "(\\-\\w+)*$",
					"~": "\\b" + attrVal + "\\b"
				}[substrOperator] : (attrVal !== null? "^" + attrVal + "$" : attrVal);
			}