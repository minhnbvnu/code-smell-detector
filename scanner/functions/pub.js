function pub(channel, message) {
		if (!channels[channel]) {
			return 0;
		}

		if (!message) {
			message = {};
		} else if (typeof message !== 'object') {
			message = {
				data: message
			};
		}

		message.channel = channel;

		// Clone a immutable snapshot of the subscription ids that we can
		// safetly iterate over.
		var sids = channels[channel].slice();

		// NB: It is necessary to read the size of the `sids' array on each
		// iteration, in case the size changes (via unsubscription) between
		// iterations.
		var i;
		for (i = 0; i < sids.length; ++i) {
			subscriptions[sids[i]].callback(message);
		}

		return i;
	}