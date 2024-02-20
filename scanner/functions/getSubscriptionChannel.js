function getSubscriptionChannel(sid) {
		return subscriptions[sid] && channels[subscriptions[sid].channel];
	}