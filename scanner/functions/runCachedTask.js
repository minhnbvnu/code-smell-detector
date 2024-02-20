function runCachedTask() {
		let rerunCachedTasks;
		const warn = () => {
			out.warn("Unable to retrieve commands to rerun");
			return false;
		};

		try {
			rerunCachedTasks = retrieveCache().get(cacheKey(cwd));
		} catch (e) {
			return warn();
		}

		if (!rerunCachedTasks || !rerunCachedTasks.length) {
			return warn();
		}

		executeCommands(rerunCachedTasks);
		return true;
	}