function ctelt (name, clazz, text) {
			var e = document.createElement(name);
			e.className = clazz;
			e.innerHTML = text;
			return e;
		}