function getDiscriminatorForRelation(relation, getOpenConditionalComments) {
      const discriminatorFragments = [];
      discriminatorFragments.push(relation.type); // HtmlScript vs. JavaScriptImportScripts
      if (relation.to.isLoaded) {
        discriminatorFragments.push('isLoaded');
      }
      let isInsideHead = false;
      let parentNode = relation.node.parentNode;
      while (parentNode) {
        if (parentNode.nodeName.toLowerCase() === 'head') {
          isInsideHead = true;
          break;
        }
        parentNode = parentNode.parentNode;
      }
      if (isInsideHead) {
        discriminatorFragments.push('head');
      } else {
        discriminatorFragments.push('body');
      }
      if (relation.from.type === 'Html') {
        discriminatorFragments.push(...getOpenConditionalComments(relation));
      }
      if (
        relation.node &&
        relation.node.hasAttribute &&
        relation.node.hasAttribute('bundle')
      ) {
        discriminatorFragments.push(relation.node.getAttribute('bundle'));
      }
      if (relation.type === 'HtmlStyle') {
        discriminatorFragments.push(
          relation.node.getAttribute('media') || 'all'
        );
        for (const attribute of Array.from(relation.node.attributes)) {
          if (
            attribute.name !== 'charset' &&
            attribute.name !== 'media' &&
            attribute.name !== 'bundle' &&
            attribute.name !== 'nonce' && // CSP
            attribute.name !== 'data-assetgraph-conditions' &&
            (attribute.name !== 'rel' || attribute.value !== 'stylesheet') &&
            (attribute.name !== 'href' ||
              relation.node.nodeName.toLowerCase() !== 'link') &&
            (attribute.name !== 'type' ||
              attribute.value !== 'text/css' ||
              !relation.to ||
              relation.to.type !== 'Css')
          ) {
            return 'nobundle';
          }
        }
      } else if (relation.type === 'HtmlScript') {
        if (relation.to.isLoaded && relation.to.isStrict) {
          discriminatorFragments.push('strict');
          const warning = new Error(
            'Global "use strict"-directive. Splitting into multiple bundles to avoid side effects.'
          );
          warning.asset = relation.to;
          assetGraph.info(warning);
        }
        if (relation.node.getAttribute('defer') === 'defer') {
          discriminatorFragments.push('defer');
        }
        if (relation.node.getAttribute('async') === 'async') {
          discriminatorFragments.push('async');
        }
        for (const attribute of Array.from(relation.node.attributes)) {
          if (
            attribute.name !== 'charset' &&
            attribute.name !== 'src' &&
            attribute.name !== 'bundle' &&
            attribute.name !== 'nonce' && // CSP
            attribute.name !== 'data-assetgraph-conditions' &&
            (attribute.name !== 'defer' || attribute.value !== 'defer') &&
            (attribute.name !== 'async' || attribute.value !== 'async') &&
            (attribute.name !== 'type' ||
              attribute.value !== 'text/javascript' ||
              !relation.to ||
              relation.to.type !== 'JavaScript')
          ) {
            return 'nobundle';
          }
        }
      }
      return discriminatorFragments.join(':');
    }