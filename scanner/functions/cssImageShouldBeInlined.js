function cssImageShouldBeInlined(cssImage) {
          const inlineParamValue = cssImage.to.query.inline;
          if (inlineParamValue !== undefined) {
            return (
              !inlineParamValue || /^(?:true|on|yes|1)$/i.test(inlineParamValue)
            );
          } else {
            return (
              !/^_/.test(cssImage.propertyName) && // Underscore hack (IE6), don't inline
              sizeThreshold >= 0 &&
              cssImage.to.rawSrc.length <= sizeThreshold &&
              !cssRuleIsInsideMediaRule(cssImage.node) &&
              assetGraph.findRelations({ from: cssAsset, to: cssImage.to })
                .length === 1
            );
          }
        }