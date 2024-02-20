function registerHooks(hooks) {
		var handlers = Aloha.settings.contentHandler;
		var i;
		for (i = 0; i < hooks.length; i++) {
			if (!handlers[hooks[i]]) {
				handlers[hooks[i]] = ['validation'];
			} else {
				handlers[hooks[i]].push('validation');
			}
		}
	}