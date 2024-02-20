function assureCitationHasId(effective) {
		var activeUid = effective.attr('data-cite-id');
		if (!activeUid) {
			activeUid = ++uid;
			effective.addClass([nsClass('wrapper')].join(' '));
			effective.addClass('aloha-cite-' + activeUid);
			effective.attr('data-cite-id', activeUid);
		}
		return activeUid;
	}