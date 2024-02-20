function splitStyleSheet(cssAsset) {
    const output = [];
    let accumulatedRules = 0;
    let offset = 0;

    for (const [i, rule] of cssAsset.parseTree.nodes.entries()) {
      const selectors = countRules(rule);

      if (accumulatedRules + selectors <= rulesPerStylesheetLimit) {
        accumulatedRules += selectors;
      } else {
        output.push({
          type: cssAsset.type,
          isPopulated: false,
          parseTree: postcss
            .root()
            .append(
              cssAsset.parseTree.nodes.slice(offset, i).map(Css.cloneWithRaws)
            ),
        });

        offset = i;
        accumulatedRules = selectors;
      }
    }

    output.push({
      type: cssAsset.type,
      isPopulated: false,
      parseTree: postcss
        .root()
        .append(cssAsset.parseTree.nodes.slice(offset).map(Css.cloneWithRaws)),
    });

    return output;
  }