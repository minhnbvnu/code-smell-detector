function telt (name, text) {
			var e = document.createElement(name);
			e.appendChild(document.createTextNode(text));
			return e;
		}