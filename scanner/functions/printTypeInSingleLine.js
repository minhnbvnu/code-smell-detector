function printTypeInSingleLine(type) {
                const flags = 70221824 /* IgnoreErrors */ | 1048576 /* AllowUniqueESSymbolType */ | 16384 /* UseAliasDefinedOutsideCurrentScope */;
                const printer = createPrinterWithRemoveComments();
                return usingSingleLineStringWriter((writer) => {
                    const typeNode = checker.typeToTypeNode(type, 
                    /*enclosingDeclaration*/
                    void 0, flags);
                    Debug.assertIsDefined(typeNode, "should always get typenode");
                    printer.writeNode(4 /* Unspecified */, typeNode, 
                    /*sourceFile*/
                    file, writer);
                });
            }