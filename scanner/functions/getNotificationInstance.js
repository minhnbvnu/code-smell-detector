function getNotificationInstance(prefixCls, placement) {
	    var cacheKey = prefixCls + '-' + placement;
	    if (!notificationInstance[cacheKey]) {
	        notificationInstance[cacheKey] = _rcNotification2['default'].newInstance({
	            prefixCls: prefixCls,
	            className: prefixCls + '-' + placement,
	            style: getPlacementStyle(placement),
	            getContainer: defaultGetContainer
	        });
	    }
	    return notificationInstance[cacheKey];
	}