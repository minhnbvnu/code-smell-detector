function initRepositoryManager(event, next) {
		Aloha.RepositoryManager.init();
		event();
		next();
	}