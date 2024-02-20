function splitBundle(bundle, index) {
        const newBundle = bundle.splice(index);
        newBundle._relationType = bundle._relationType;
        for (const asset of newBundle) {
          assetIndex[asset.id] = newBundle;
        }
        if (newBundle.length > 0) {
          bundles.push(newBundle);
        }
        return newBundle;
      }