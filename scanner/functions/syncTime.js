function syncTime(from, to) {
	  if (!_moment2['default'].isMoment(from) || !_moment2['default'].isMoment(to)) return;
	  to.hour(from.hour());
	  to.minute(from.minute());
	  to.second(from.second());
	}