function* fixInlineTypeImportDeclaration(fixer, report, sourceImports) {
                const { node } = report;
                // For a value import, will only add an inline type to named specifiers
                const { namedSpecifiers } = classifySpecifier(node);
                const typeNamedSpecifiers = namedSpecifiers.filter(specifier => report.typeSpecifiers.includes(specifier));
                if (sourceImports.valueImport) {
                    // add import named type specifiers to its value import
                    // import ValueA, { type A }
                    //                  ^^^^ insert
                    const { namedSpecifiers: valueImportNamedSpecifiers } = classifySpecifier(sourceImports.valueImport);
                    if (sourceImports.valueOnlyNamedImport ||
                        valueImportNamedSpecifiers.length) {
                        yield* fixInsertTypeKeywordInNamedSpecifierList(fixer, typeNamedSpecifiers);
                    }
                }
            }