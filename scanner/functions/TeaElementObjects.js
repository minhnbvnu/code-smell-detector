function TeaElementObjects(elements) {
	var that = this;

	elements.$each(function (index, element) {
		that[index] = element;
	});

	this.bind = function (event, listener) {
		elements.$each(function (_, element) {
			if (typeof (teaEventListeners[element]) == "undefined") {
				teaEventListeners[element] = {};
			}
			if (typeof (teaEventListeners[element][event]) == "undefined") {
				teaEventListeners[element][event] = [];
			}
			teaEventListeners[element][event].push(listener);
			element.addEventListener(event, listener)
		});

		return this;
	};

	this.unbind = function (event) {
		elements.$each(function (_, element) {
			if (typeof (teaEventListeners[element]) == "undefined") {
				return;
			}
			if (typeof (teaEventListeners[element][event]) == "undefined") {
				return;
			}
			teaEventListeners[element][event].$each(function (_, listener) {
				element.removeEventListener(event, listener);
			});
			teaEventListeners[element][event] = [];
			var hasListeners = false;
			for (var k in teaEventListeners[element]) {
				if (!teaEventListeners[element].hasOwnProperty(k)) {
					continue;
				}

				if (teaEventListeners[element][k] instanceof Array && teaEventListeners[element][k].length > 0) {
					hasListeners = true;
				}
			}

			if (!hasListeners) {
				delete (teaEventListeners[element]);
			}
		});

		return this;
	};

	this.first = function () {
		var first = elements.$first();
		if (first != null) {
			return Tea.element(first);
		}
		return new TeaElementObjects([]);
	};

	this.last = function () {
		var last = elements.$last();
		if (last != null) {
			return Tea.element(last);
		}
		return new TeaElementObjects([]);
	};

	this.attrs = function () {
		var first = this.first();
		if (first.length === 0) {
			return {};
		}

		var attrs = {};
		var node = first[0];
		for (var i = 0; i < node.attributes.length; i++) {
			var attr = node.attributes[i];
			attrs[attr.name] = attr.value;
		}
		return attrs;
	};

	this.attr = function (name, value) {
		if (arguments.length === 0) {
			return "";
		}

		if (arguments.length === 1) {
			var attrs = this.attrs();
			if (typeof (attrs[name]) !== "undefined") {
				return attrs[name];
			}
			return "";
		}

		var first = this.first();
		if (first.length > 0) {
			first[0].setAttribute(name, value);
		}

		return this;
	};

	this.tagName = function () {
		var first = this.first();
		if (first.length === 0) {
			return "";
		}
		return first[0].tagName;
	};

	this.focus = function () {
		var first = this.first();
		if (first.length === 0) {
			return;
		}
		first[0].focus();
	};

	this.blur = function () {
		this.each(function (k, v) {
			v.blur();
		});
	};

	this.each = function (iterator) {
		elements.$each(function (index, element) {
			iterator(index, element);
		});

		return this;
	};

	this.find = function (selector) {
		if (this.length == 0) {
			return new TeaElementObjects([]);
		}
		return Tea.element(selector, this.first()[0]);
	};

	this.hide = function () {
		this.each(function (_, element) {
			element.style.display = "none";
		});
		return this;
	};

	this.show = function () {
		this.each(function (_, element) {
			element.style.display = "block";
		});
		return this;
	};

	this.text = function () {
		if (arguments.length > 0) {
			var text = arguments[0];
			this.each(function (_, element) {
				if (typeof (element.textContent) != "undefined") {
					element.textContent = text;
				}
				if (typeof (element.innerText) != "undefined") {
					element.innerText = text;
				}
			});
			return this;
		}

		if (this.length == 0) {
			return "";
		}
		if (typeof (elements[0].textContent) == "string") {
			return elements[0].textContent;
		}
		return elements[0].innerText;
	};

	this.html = function () {
		if (arguments.length > 0) {
			var html = arguments[0];
			this.each(function (_, element) {
				element.innerHTML = html;
			});
			return this;
		}

		if (this.length == 0) {
			return "";
		}
		return elements[0].innerHTML;
	};

	this.val = function () {
		if (arguments.length > 0) {
			var value = arguments[0];
			this.each(function (_, element) {
				element.value = value;
			});
			return this;
		}

		if (this.length == 0) {
			return "";
		}
		return elements[0].value;
	};

	this.remove = function () {
		this.each(function (_, element) {
			var parent = element.parentNode;
			if (parent != null) {
				parent.removeChild(element);
			}
		});
		return this;
	};

	this.length = elements.length;
}