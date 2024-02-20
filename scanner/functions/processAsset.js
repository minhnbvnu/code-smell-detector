async function processAsset(asset) {
      if (seenAssets.has(asset)) {
        return;
      }
      seenAssets.add(asset);
      try {
        await asset.load();
      } catch (err) {
        if (
          asset.incomingRelations.length > 0 &&
          asset.incomingRelations.every((relation) =>
            /SourceMappingUrl$/.test(relation.type)
          )
        ) {
          assetGraph.info(err);
        } else {
          assetGraph.warn(err);
        }
        return;
      }
      for (const relation of asset.externalRelations) {
        if (relation.to && followRelationsMatcher(relation, assetGraph)) {
          if (!stopAssetsMatcher(relation.to)) {
            assetQueue.push(relation.to);
          }
        }
      }
    }