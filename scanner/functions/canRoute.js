function canRoute(url) {
	for (let i = ROUTERS.length; i--; ) {
		if (ROUTERS[i].canRoute(url)) return true;
	}
	return false;
}