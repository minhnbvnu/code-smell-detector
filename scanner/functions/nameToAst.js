function nameToAst(name) {
        name =
          (!wrapInFunction &&
            Object.prototype.hasOwnProperty.call(aliasByGlobalName, name) &&
            aliasByGlobalName[name]) ||
          name;
        const nameFragments = name.split('.');
        if (nameFragments.length > 1) {
          return {
            type: 'MemberExpression',
            computed: false,
            object:
              nameToAst(
                nameFragments.slice(0, nameFragments.length - 1).join('.')
              ) || 'wat1',
            property: {
              type: 'Identifier',
              name: nameFragments[nameFragments.length - 1],
            },
          };
        } else {
          return { type: 'Identifier', name: nameFragments[0] };
        }
      }