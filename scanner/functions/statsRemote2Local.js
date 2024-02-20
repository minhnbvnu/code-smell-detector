function statsRemote2Local(stats) {
	    return Stats.fromBuffer(transferrableObjectToBuffer(stats.statsData));
	}