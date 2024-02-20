function makeCreateElement(value) {
				return function () {
					return document.createElement(value);
				};
			}