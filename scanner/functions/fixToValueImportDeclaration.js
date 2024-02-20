function* fixToValueImportDeclaration(fixer, report, sourceImports) {
                const { node } = report;
                const { defaultSpecifier, namespaceSpecifier, namedSpecifiers } = classifySpecifier(node);
                if (namespaceSpecifier) {
                    // import type * as types from 'foo'
                    yield* fixRemoveTypeSpecifierFromImportDeclaration(fixer, node);
                    return;
                }
                else if (defaultSpecifier) {
                    if (report.valueSpecifiers.includes(defaultSpecifier) &&
                        namedSpecifiers.length === 0) {
                        // import type Type from 'foo'
                        yield* fixRemoveTypeSpecifierFromImportDeclaration(fixer, node);
                        return;
                    }
                }
                else {
                    if (namedSpecifiers.every(specifier => report.valueSpecifiers.includes(specifier))) {
                        // import type {Type1, Type2} from 'foo'
                        yield* fixRemoveTypeSpecifierFromImportDeclaration(fixer, node);
                        return;
                    }
                }
                // we have some valueSpecifiers intermixed in types that need to be put on their own line
                // import type { Type1, A } from 'foo'
                // import type { A } from 'foo'
                const valueNamedSpecifiers = namedSpecifiers.filter(specifier => report.valueSpecifiers.includes(specifier));
                const fixesNamedSpecifiers = getFixesNamedSpecifiers(fixer, node, valueNamedSpecifiers, namedSpecifiers);
                const afterFixes = [];
                if (valueNamedSpecifiers.length) {
                    if (sourceImports.valueOnlyNamedImport) {
                        const insertTypeNamedSpecifiers = fixInsertNamedSpecifiersInNamedSpecifierList(fixer, sourceImports.valueOnlyNamedImport, fixesNamedSpecifiers.typeNamedSpecifiersText);
                        if (sourceImports.valueOnlyNamedImport.range[1] <= node.range[0]) {
                            yield insertTypeNamedSpecifiers;
                        }
                        else {
                            afterFixes.push(insertTypeNamedSpecifiers);
                        }
                    }
                    else {
                        // some are types.
                        // Add new value import and later remove those value specifiers from import type
                        yield fixer.insertTextBefore(node, `import {${fixesNamedSpecifiers.typeNamedSpecifiersText}} from ${sourceCode.getText(node.source)};\n`);
                    }
                }
                yield* fixesNamedSpecifiers.removeTypeNamedSpecifiers;
                yield* afterFixes;
            }