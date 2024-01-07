function onLoadedAsset(key, asset) {
        count--;
        manifest[key].asset = asset;
        if (count === 0) {
            if (onLoadedAssets) {
                onLoadedAssets();
            }
        }
    }