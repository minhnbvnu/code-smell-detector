function transformDeprecatedShadowDOMSelectors(css, context) {
  const transformedSelectors = [];
  let transformedSource;
  try {
    transformedSource = postcss.parse(css);
  } catch (e) {
    transformedSource = null;
  }

  if (transformedSource) {
    transformedSource.walkRules(rule => {
      const transformedSelector = selectorParser(selectors => {
        selectors.each(selector => {
          const firstNode = selector.nodes[0];
          if (
            context === 'atom-text-editor' &&
            firstNode.type === 'pseudo' &&
            firstNode.value === ':host'
          ) {
            const atomTextEditorElementNode = selectorParser.tag({
              value: 'atom-text-editor'
            });
            firstNode.replaceWith(atomTextEditorElementNode);
          }

          let previousNodeIsAtomTextEditor = false;
          let targetsAtomTextEditorShadow = context === 'atom-text-editor';
          let previousNode;
          selector.each(node => {
            if (targetsAtomTextEditorShadow && node.type === 'class') {
              if (DEPRECATED_SYNTAX_SELECTORS.has(node.value)) {
                node.value = `syntax--${node.value}`;
              }
            } else {
              if (
                previousNodeIsAtomTextEditor &&
                node.type === 'pseudo' &&
                node.value === '::shadow'
              ) {
                node.type = 'className';
                node.value = '.editor';
                targetsAtomTextEditorShadow = true;
              }
            }
            previousNode = node;
            if (node.type === 'combinator') {
              previousNodeIsAtomTextEditor = false;
            } else if (
              previousNode.type === 'tag' &&
              previousNode.value === 'atom-text-editor'
            ) {
              previousNodeIsAtomTextEditor = true;
            }
          });
        });
      }).processSync(rule.selector, { lossless: true });
      if (transformedSelector !== rule.selector) {
        transformedSelectors.push({
          before: rule.selector,
          after: transformedSelector
        });
        rule.selector = transformedSelector;
      }
    });

    let deprecationMessage;
    if (transformedSelectors.length > 0) {
      deprecationMessage =
        'Starting from Atom v1.13.0, the contents of `atom-text-editor` elements ';
      deprecationMessage +=
        'are no longer encapsulated within a shadow DOM boundary. ';
      deprecationMessage +=
        'This means you should stop using `:host` and `::shadow` ';
      deprecationMessage +=
        'pseudo-selectors, and prepend all your syntax selectors with `syntax--`. ';
      deprecationMessage +=
        'To prevent breakage with existing style sheets, Atom will automatically ';
      deprecationMessage += 'upgrade the following selectors:\n\n';
      deprecationMessage +=
        transformedSelectors
          .map(selector => `* \`${selector.before}\` => \`${selector.after}\``)
          .join('\n\n') + '\n\n';
      deprecationMessage +=
        'Automatic translation of selectors will be removed in a few release cycles to minimize startup time. ';
      deprecationMessage +=
        'Please, make sure to upgrade the above selectors as soon as possible.';
    }
    return { source: transformedSource.toString(), deprecationMessage };
  } else {
    // CSS was malformed so we don't transform it.
    return { source: css };
  }
}