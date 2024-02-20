function routeTo(url) {
	let didRoute = false;
	for (let i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url)) {
			didRoute = true;
		}
	}
	return didRoute;
}