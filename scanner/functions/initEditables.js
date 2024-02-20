function initEditables(event, next) {
		var i;
		for (i = 0; i < Aloha.editables.length; i++) {
			if (!Aloha.editables[i].ready) {
				Aloha.editables[i].init();
			}
		}
		event();
		next();
	}