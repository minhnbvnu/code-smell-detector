function* fixToTypeImportDeclaration(fixer, report, sourceImports) {
                const { node } = report;
                const { defaultSpecifier, namespaceSpecifier, namedSpecifiers } = classifySpecifier(node);
                if (namespaceSpecifier && !defaultSpecifier) {
                    // import * as types from 'foo'
                    yield* fixInsertTypeSpecifierForImportDeclaration(fixer, node, false);
                    return;
                }
                else if (defaultSpecifier) {
                    if (report.typeSpecifiers.includes(defaultSpecifier) &&
                        namedSpecifiers.length === 0 &&
                        !namespaceSpecifier) {
                        // import Type from 'foo'
                        yield* fixInsertTypeSpecifierForImportDeclaration(fixer, node, true);
                        return;
                    }
                    else if (fixStyle === 'inline-type-imports' &&
                        !report.typeSpecifiers.includes(defaultSpecifier) &&
                        namedSpecifiers.length > 0 &&
                        !namespaceSpecifier) {
                        // if there is a default specifier but it isn't a type specifier, then just add the inline type modifier to the named specifiers
                        // import AValue, {BValue, Type1, Type2} from 'foo'
                        yield* fixInlineTypeImportDeclaration(fixer, report, sourceImports);
                        return;
                    }
                }
                else if (!namespaceSpecifier) {
                    if (fixStyle === 'inline-type-imports' &&
                        namedSpecifiers.some(specifier => report.typeSpecifiers.includes(specifier))) {
                        // import {AValue, Type1, Type2} from 'foo'
                        yield* fixInlineTypeImportDeclaration(fixer, report, sourceImports);
                        return;
                    }
                    else if (namedSpecifiers.every(specifier => report.typeSpecifiers.includes(specifier))) {
                        // import {Type1, Type2} from 'foo'
                        yield* fixInsertTypeSpecifierForImportDeclaration(fixer, node, false);
                        return;
                    }
                }
                const typeNamedSpecifiers = namedSpecifiers.filter(specifier => report.typeSpecifiers.includes(specifier));
                const fixesNamedSpecifiers = getFixesNamedSpecifiers(fixer, node, typeNamedSpecifiers, namedSpecifiers);
                const afterFixes = [];
                if (typeNamedSpecifiers.length) {
                    if (sourceImports.typeOnlyNamedImport) {
                        const insertTypeNamedSpecifiers = fixInsertNamedSpecifiersInNamedSpecifierList(fixer, sourceImports.typeOnlyNamedImport, fixesNamedSpecifiers.typeNamedSpecifiersText);
                        if (sourceImports.typeOnlyNamedImport.range[1] <= node.range[0]) {
                            yield insertTypeNamedSpecifiers;
                        }
                        else {
                            afterFixes.push(insertTypeNamedSpecifiers);
                        }
                    }
                    else {
                        // The import is both default and named.  Insert named on new line because can't mix default type import and named type imports
                        if (fixStyle === 'inline-type-imports') {
                            yield fixer.insertTextBefore(node, `import {${typeNamedSpecifiers
                                .map(spec => {
                                const insertText = sourceCode.text.slice(...spec.range);
                                return `type ${insertText}`;
                            })
                                .join(', ')}} from ${sourceCode.getText(node.source)};\n`);
                        }
                        else {
                            yield fixer.insertTextBefore(node, `import type {${fixesNamedSpecifiers.typeNamedSpecifiersText}} from ${sourceCode.getText(node.source)};\n`);
                        }
                    }
                }
                const fixesRemoveTypeNamespaceSpecifier = [];
                if (namespaceSpecifier &&
                    report.typeSpecifiers.includes(namespaceSpecifier)) {
                    // import Foo, * as Type from 'foo'
                    // import DefType, * as Type from 'foo'
                    // import DefType, * as Type from 'foo'
                    const commaToken = util.nullThrows(sourceCode.getTokenBefore(namespaceSpecifier, util.isCommaToken), util.NullThrowsReasons.MissingToken(',', node.type));
                    // import Def, * as Ns from 'foo'
                    //           ^^^^^^^^^ remove
                    fixesRemoveTypeNamespaceSpecifier.push(fixer.removeRange([commaToken.range[0], namespaceSpecifier.range[1]]));
                    // import type * as Ns from 'foo'
                    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ insert
                    yield fixer.insertTextBefore(node, `import type ${sourceCode.getText(namespaceSpecifier)} from ${sourceCode.getText(node.source)};\n`);
                }
                if (defaultSpecifier &&
                    report.typeSpecifiers.includes(defaultSpecifier)) {
                    if (report.typeSpecifiers.length === node.specifiers.length) {
                        const importToken = util.nullThrows(sourceCode.getFirstToken(node, util.isImportKeyword), util.NullThrowsReasons.MissingToken('import', node.type));
                        // import type Type from 'foo'
                        //        ^^^^ insert
                        yield fixer.insertTextAfter(importToken, ' type');
                    }
                    else {
                        const commaToken = util.nullThrows(sourceCode.getTokenAfter(defaultSpecifier, util.isCommaToken), util.NullThrowsReasons.MissingToken(',', defaultSpecifier.type));
                        // import Type , {...} from 'foo'
                        //        ^^^^^ pick
                        const defaultText = sourceCode.text
                            .slice(defaultSpecifier.range[0], commaToken.range[0])
                            .trim();
                        yield fixer.insertTextBefore(node, `import type ${defaultText} from ${sourceCode.getText(node.source)};\n`);
                        const afterToken = util.nullThrows(sourceCode.getTokenAfter(commaToken, { includeComments: true }), util.NullThrowsReasons.MissingToken('any token', node.type));
                        // import Type , {...} from 'foo'
                        //        ^^^^^^^ remove
                        yield fixer.removeRange([
                            defaultSpecifier.range[0],
                            afterToken.range[0],
                        ]);
                    }
                }
                yield* fixesNamedSpecifiers.removeTypeNamedSpecifiers;
                yield* fixesRemoveTypeNamespaceSpecifier;
                yield* afterFixes;
            }