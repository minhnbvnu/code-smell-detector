function registerSubscriptions(channels) {
		var i;
		for (i = 0; i < channels.length; i++) {
			PubSub.sub(channels[i], validateActiveEditable);
		}
	}