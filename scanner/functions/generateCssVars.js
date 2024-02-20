function generateCssVars() {

  const cssPropertyDefaults = {};

  return {
    name: 'css-vars',
    analyzePhase({ ts, node, moduleDoc }) {

      switch (node.kind) {
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateExpression: {

          // Use moduleDoc.path as key, the class node might not be there yet.
          if (!cssPropertyDefaults[moduleDoc.path]) {
            cssPropertyDefaults[moduleDoc.path] = {};
          }

          const text = node.getFullText();
          if (text.includes('var(--')) {

            const matches = matchRecursive(text, /var\(/);
            matches.forEach(m => {
              const splitted = m.split(',');
              const cssProp = splitted[0].trim();
              const cssDefault = splitted.slice(1)
                .join(',')
                .replace(/\s*\n\s*/g, ' ')
                .trim();

              // Filter out CSS vars like --${this.localName}-display
              if (!/\$\{/.test(cssProp) && !/\$\{/.test(cssDefault)) {
                cssPropertyDefaults[moduleDoc.path][cssProp] = cssDefault;
              }
            });
          }
          break;
        }
      }
    },
    moduleLinkPhase({ moduleDoc }) {
      const classDeclaration = moduleDoc.declarations.find(d => d.kind === 'class');

      // Add the extracted CSS var defaults if none were declared in the JS doc yet.
      const cssDefaults = cssPropertyDefaults[moduleDoc.path];

      for (let prop of classDeclaration.cssProperties ?? []) {
        if (!prop.default && cssDefaults[prop.name]) {
          prop.default = cssDefaults[prop.name];
        }
      }
    },
    packageLinkPhase({ customElementsManifest: manifest }) {

      // Add the css properties from the super class if they are not set yet.
      for (let cls of getClasses(manifest)) {

        if (cls.superclass?.name) {
          const SuperClass = getClasses(manifest).find(({ name }) => cls.superclass.name === name);

          for (let cssProp of SuperClass.cssProperties ?? []) {
            if (!cls.cssProperties) cls.cssProperties = [];
            if (!cls.cssProperties.find(p => p.name === cssProp.name)) {
              cls.cssProperties.push(cssProp);
            }
          }
        }
      }
    },
  };
}