function getCacheFilePath(appPath, hash) {
	return path.join(appPath, '..', CONST.DIR.BUILD, 'global_style_cache_' + hash + '.json');
}