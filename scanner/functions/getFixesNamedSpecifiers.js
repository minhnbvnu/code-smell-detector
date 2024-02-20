function getFixesNamedSpecifiers(fixer, node, subsetNamedSpecifiers, allNamedSpecifiers) {
                if (allNamedSpecifiers.length === 0) {
                    return {
                        typeNamedSpecifiersText: '',
                        removeTypeNamedSpecifiers: [],
                    };
                }
                const typeNamedSpecifiersTexts = [];
                const removeTypeNamedSpecifiers = [];
                if (subsetNamedSpecifiers.length === allNamedSpecifiers.length) {
                    // import Foo, {Type1, Type2} from 'foo'
                    // import DefType, {Type1, Type2} from 'foo'
                    const openingBraceToken = util.nullThrows(sourceCode.getTokenBefore(subsetNamedSpecifiers[0], util.isOpeningBraceToken), util.NullThrowsReasons.MissingToken('{', node.type));
                    const commaToken = util.nullThrows(sourceCode.getTokenBefore(openingBraceToken, util.isCommaToken), util.NullThrowsReasons.MissingToken(',', node.type));
                    const closingBraceToken = util.nullThrows(sourceCode.getFirstTokenBetween(openingBraceToken, node.source, util.isClosingBraceToken), util.NullThrowsReasons.MissingToken('}', node.type));
                    // import DefType, {...} from 'foo'
                    //               ^^^^^^^ remove
                    removeTypeNamedSpecifiers.push(fixer.removeRange([commaToken.range[0], closingBraceToken.range[1]]));
                    typeNamedSpecifiersTexts.push(sourceCode.text.slice(openingBraceToken.range[1], closingBraceToken.range[0]));
                }
                else {
                    const namedSpecifierGroups = [];
                    let group = [];
                    for (const namedSpecifier of allNamedSpecifiers) {
                        if (subsetNamedSpecifiers.includes(namedSpecifier)) {
                            group.push(namedSpecifier);
                        }
                        else if (group.length) {
                            namedSpecifierGroups.push(group);
                            group = [];
                        }
                    }
                    if (group.length) {
                        namedSpecifierGroups.push(group);
                    }
                    for (const namedSpecifiers of namedSpecifierGroups) {
                        const { removeRange, textRange } = getNamedSpecifierRanges(namedSpecifiers, allNamedSpecifiers);
                        removeTypeNamedSpecifiers.push(fixer.removeRange(removeRange));
                        typeNamedSpecifiersTexts.push(sourceCode.text.slice(...textRange));
                    }
                }
                return {
                    typeNamedSpecifiersText: typeNamedSpecifiersTexts.join(','),
                    removeTypeNamedSpecifiers,
                };
            }