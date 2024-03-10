function makeBundle(assetsToBundle, incomingType) {
      if (assetsToBundle.length === 0) {
        throw new Error('makeBundle: Bundle must contain at least one asset');
      } else if (assetsToBundle.length === 1) {
        // Shortcut
        return [assetsToBundle[0]];
      }

      const type = assetsToBundle[0].type;

      let parseTree;
      if (type === 'JavaScript') {
        parseTree = combineJavaScriptAsts(
          assetsToBundle.map((asset) => asset.parseTree)
        );
      } else {
        // type === 'Css'
        parseTree = postcss.parse('');
        // Make sure that all @import rules go at the top of the bundle:
        const importRules = [];
        for (const asset of assetsToBundle) {
          const topLevelNodes = asset.parseTree.nodes;
          for (let i = 0; i < topLevelNodes.length; i += 1) {
            const topLevelNode = topLevelNodes[i];
            topLevelNode.parent = parseTree;
            if (
              topLevelNode.type === 'atrule' &&
              topLevelNode.name === 'import'
            ) {
              importRules.push(topLevelNode);
              topLevelNodes.splice(i, 1);
              i -= 1;
            }
          }
          parseTree.nodes.push(...topLevelNodes);
        }
        if (importRules.length > 0) {
          parseTree.nodes.unshift(...importRules);
        }
      }

      const bundleAsset = assetGraph.addAsset({
        type,
        parseTree,
        baseName: 'bundle',
        outgoingRelations: assetGraph.findRelations({
          from: { id: { $in: assetsToBundle.map((asset) => asset.id) } },
        }),
        lastKnownByteLength: assetsToBundle.reduce(
          (sumOfLastKnownByteLengths, asset) => {
            return sumOfLastKnownByteLengths + asset.lastKnownByteLength;
          },
          0
        ),
        _toBeMinified: assetsToBundle.every((asset) => asset._toBeMinified),
        isPretty: assetsToBundle.every((asset) => asset.isPretty),
      });

      const seenReferringAssets = new Set();
      const incomingRelations = assetGraph.findRelations({
        type: incomingType,
        to: { id: { $in: assetsToBundle.map((asset) => asset.id) } },
      });

      // Point at the bundled asset with a root-relative href if at least one of the relations
      // being bundled have a more specific hrefType than 'relative':
      const bundleRelationHrefType = incomingRelations.some(
        (incomingRelation) =>
          !['relative', 'inline'].includes(incomingRelation.hrefType)
      )
        ? 'rootRelative'
        : 'relative';

      const combinedAssetGraphConditions = {};
      // Reverse iteration for HtmlScript relations to ensure bundle insertion at tail end
      for (const incomingRelation of incomingType === 'HtmlScript'
        ? incomingRelations.slice().reverse()
        : incomingRelations) {
        if (!seenReferringAssets.has(incomingRelation.from)) {
          const bundleRelation = incomingRelation.from.addRelation(
            {
              type: incomingType,
              hrefType: bundleRelationHrefType,
              media: incomingRelation.media, // Only used for HtmlStyle
              async: incomingRelation.async, // Only used for HtmlScript
              defer: incomingRelation.defer, // Only used for HtmlScript
              to: bundleAsset,
            },
            'before',
            incomingRelation
          );
          if (incomingRelation.from.type === 'Html') {
            let commonNonce;
            let nonceIsUnique = true;
            for (const relation of incomingRelations) {
              if (relation.from === incomingRelation.from) {
                if (relation.node.hasAttribute('nonce')) {
                  const nonce = relation.node.getAttribute('nonce');
                  if (typeof commonNonce === 'undefined') {
                    commonNonce = nonce;
                  } else if (commonNonce !== nonce) {
                    nonceIsUnique = false;
                  }
                }
              }
              const conditions = assetGraphConditions.parse(relation.node);
              if (conditions) {
                for (const conditionName of Object.keys(conditions)) {
                  if (
                    Array.isArray(combinedAssetGraphConditions[conditionName])
                  ) {
                    combinedAssetGraphConditions[conditionName].push(
                      conditions[conditionName]
                    );
                  } else {
                    combinedAssetGraphConditions[conditionName] = [
                      conditions[conditionName],
                    ];
                  }
                }
              }
            }
            if (typeof commonNonce !== 'undefined' && nonceIsUnique) {
              bundleRelation.node.setAttribute('nonce', commonNonce);
              bundleRelation.from.markDirty();
            }
            const conditionNames = Object.keys(combinedAssetGraphConditions);
            if (conditionNames.length > 0) {
              for (const conditionName of conditionNames) {
                const uniqueValues = _.uniq(
                  combinedAssetGraphConditions[conditionName]
                );
                if (uniqueValues.length === 1) {
                  combinedAssetGraphConditions[conditionName] = uniqueValues[0];
                } else {
                  combinedAssetGraphConditions[conditionName] = uniqueValues;
                }
              }
              bundleRelation.node.setAttribute(
                'data-assetgraph-conditions',
                assetGraphConditions.stringify(combinedAssetGraphConditions)
              );
            }
          }
          seenReferringAssets.add(incomingRelation.from);
        }
        incomingRelation.detach();
      }

      for (const outgoingRelation of assetGraph.findRelations({
        from: bundleAsset,
      })) {
        outgoingRelation.refreshHref();
      }

      for (const asset of assetsToBundle) {
        if (
          assetGraph.findRelations({
            to: asset,
            type: { $not: 'SourceMapFile' },
          }).length === 0
        ) {
          for (const sourceMapFileRelation of assetGraph.findRelations({
            to: asset,
            type: 'SourceMapFile',
          })) {
            sourceMapFileRelation.remove();
          }
          assetGraph.removeAsset(asset);
        }
      }
      return bundleAsset;
    }