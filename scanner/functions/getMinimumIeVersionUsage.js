function getMinimumIeVersionUsage(asset, stack = []) {
      if (asset.type === 'Html') {
        return 1;
      }
      if (minimumIeVersionByAsset.has(asset)) {
        return minimumIeVersionByAsset.get(asset);
      }
      stack.push(asset);
      const minimumIeVersion = Math.min(
        ...asset.incomingRelations
          .filter((incomingRelation) => !stack.includes(incomingRelation.from))
          .map((incomingRelation) => {
            let matchCondition;
            if (incomingRelation.type === 'HtmlConditionalComment') {
              matchCondition = incomingRelation.condition.match(
                /^(gte?|lte?)\s+IE\s+(\d+)$/i
              );
            } else if (incomingRelation.from.type === 'Html') {
              const openConditionalComments =
                getOpenConditionalComments(incomingRelation);
              if (openConditionalComments.length > 0) {
                matchCondition = openConditionalComments[0].match(
                  /^\[if\s+(gte?|lte?)\s+IE\s+(\d+)\s*\]\s*>\s*<\s*!\s*$/i
                );
              }
            }
            if (matchCondition) {
              if (matchCondition[1].substr(0, 2) === 'lt') {
                return 1;
              } else {
                return (
                  parseInt(matchCondition[2], 10) +
                  (matchCondition[1].toLowerCase() === 'gt' ? 1 : 0)
                );
              }
            } else {
              return getMinimumIeVersionUsage(incomingRelation.from, stack);
            }
          })
      );
      minimumIeVersionByAsset.set(asset, minimumIeVersion);
      return minimumIeVersion;
    }