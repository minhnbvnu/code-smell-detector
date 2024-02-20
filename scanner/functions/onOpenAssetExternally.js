function onOpenAssetExternally(appName, assetName) {
    // Assumes that the asset was local and not built-in
    const url = gameSource.assets[assetName]._sourceURL || gameSource.assets[assetName].$url;
    const filename = serverConfig.rootPath + urlToLocalWebPath(url);
    postToServer({command: 'open',
                  app: appName,
                  file: filename});
}