function hasAttr (elm, attr) {
				return elm.hasAttribute? elm.hasAttribute(attr) : (elm.attributes && elm.attributes[attr] && !/type/.test(attr))? !!elm.attributes[attr].specified : (elm.getAttribute(attr) !== null);
			}