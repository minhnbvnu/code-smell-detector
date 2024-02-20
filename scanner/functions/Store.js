function Store(name, callback) {
		callback = callback || function () {};

		this._dbName = name;

		if (!localStorage.getItem(name)) {
			var todos = [];

			localStorage.setItem(name, JSON.stringify(todos));
		}

		callback.call(this, JSON.parse(localStorage.getItem(name)));
	}