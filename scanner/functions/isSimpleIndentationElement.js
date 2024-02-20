function isSimpleIndentationElement(node) {
		if (!isIndentationElement(node)) {
			return false;
		}

		if (node.tagName != "BLOCKQUOTE" && node.tagName != "DIV") {
			return false;
		}

		var i;
		for (i = 0; i < node.attributes.length; i++) {
			if (!isHtmlNamespace(node.attributes[i].namespaceURI) || jQuery.inArray(node.attributes[i].name, ["style", "class", "dir"]) == -1) {
				return false;
			}
		}

		if (typeof node.style.length !== 'undefined') {
			for (i = 0; i < node.style.length; i++) {
				// This is approximate, but it works well enough for my purposes.
				if (!/^(-[a-z]+-)?(margin|border|padding)/.test(node.style[i])) {
					return false;
				}
			}
		} else {
			var s;
			/*jslint forin: true*/ //not sure whether node.style.hasOwnProperty is valid
			for (s in node.style) {
				// This is approximate, but it works well enough for my purposes.
				if (!/^(-[a-z]+-)?(margin|border|padding)/.test(s) && node.style[s] && node.style[s] !== 0 && node.style[s] !== 'false') {
					return false;
				}
			}
			/*jslint forin: false*/
		}

		return true;
	}