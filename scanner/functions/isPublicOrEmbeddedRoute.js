function isPublicOrEmbeddedRoute(routeName) {
	return routeName.startsWith('Embed') || routeName.startsWith('Public')
}