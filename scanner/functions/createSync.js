function createSync(options) {
	const resolver = ResolverFactory.createResolver({
		useSyncFileSystemCalls: true,
		fileSystem: nodeFileSystem,
		...options
	});
	/**
	 * @param {object|string} context custom context
	 * @param {string} path base path
	 * @param {string=} request request to resolve
	 * @returns {string|false} Resolved path or false
	 */
	return function (context, path, request) {
		if (typeof context === "string") {
			request = path;
			path = context;
			context = nodeContext;
		}
		return resolver.resolveSync(context, path, /** @type {string} */ (request));
	};
}